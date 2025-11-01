import { useMemo } from 'react';


interface RawData { [key: string]: any; }

interface Collaborator {
  name: string;
  area: string;
}

// Hook customizado para processar e calcular todos os dados de produtividade.
export const useProductivityData = (
  uploadedData: RawData[],
  startDate: string,
  endDate: string,
  selectedCollaborator: string,
  collaborators: Collaborator[],
) => {

  const data = useMemo(() => {
    return uploadedData;
  }, [uploadedData]);

  // Filtra os dados brutos com base no período e no colaborador selecionado.
  const filteredData = useMemo(() => {
    let filtered = data.filter(item => {
      const itemDate = new Date(item.date);
      const start = new Date(startDate);
      const end = new Date(endDate);
      return itemDate >= start && itemDate <= end;
    });

    if (selectedCollaborator !== 'all') {
      filtered = filtered.filter(item => item.collaborator === selectedCollaborator);
    }

    return filtered;
  }, [data, startDate, endDate, selectedCollaborator]);

  // Calcula as métricas principais (totais, médias) com base nos dados filtrados.
  const metrics = useMemo(() => {
    const totalItems = filteredData.reduce((sum, item) => sum + item.items, 0);
    const totalDays = new Set(filteredData.map(item => item.date)).size;
    const grandTotalItems = data.reduce((sum, item) => sum + item.items, 0);
    
    // 8 horas e 48 minutos = 8.8 horas
    const hoursPerDay = 8.8; 

    return {
      totalItems,
      avgDaily: totalDays > 0 ? (totalItems / totalDays) : 0,
      avgHourly: totalDays > 0 ? (totalItems / (totalDays * hoursPerDay)) : 0,
      totalDays,
      grandTotalItems,
    };
  }, [filteredData, data]);

  // Agrupa os dados por dia para o gráfico de evolução diária.
  const dailyData = useMemo(() => {
    const grouped: { [key: string]: number } = {};
    filteredData.forEach(item => {
      if (!grouped[item.date]) {
        grouped[item.date] = 0;
      }
      grouped[item.date] += item.items;
    });

    // Ordena as entradas pela data (chave do objeto) em ordem cronológica.
    // A data está no formato 'AAAA-MM-DD', então a ordenação de string funciona perfeitamente.
    return Object.entries(grouped)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([date, items]) => ({
        date: new Date(date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', timeZone: 'UTC' }),
        items,
      }));
  }, [filteredData]);

  // Agrupa os dados por colaborador e por dia para o gráfico de evolução.
  const dailyCollaboratorData = useMemo(() => {
    // Primeiro, agrupa todos os itens por data e colaborador.
    const groupedByCollaboratorAndDate: { [collaborator: string]: { [date: string]: number } } = {};

    filteredData.forEach(item => {
      if (!groupedByCollaboratorAndDate[item.collaborator]) {
        groupedByCollaboratorAndDate[item.collaborator] = {};
      }
      if (!groupedByCollaboratorAndDate[item.collaborator][item.date]) {
        groupedByCollaboratorAndDate[item.collaborator][item.date] = 0;
      }
      groupedByCollaboratorAndDate[item.collaborator][item.date] += item.items;
    });

    // Pega todas as datas únicas no período e as ordena.
    const allDates = Array.from(new Set(filteredData.map(item => item.date))).sort();

    // Transforma os dados para o formato do gráfico.
    return allDates.map(date => {
      const entry: { [key: string]: any } = { date: new Date(date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', timeZone: 'UTC' }) };
      Object.keys(groupedByCollaboratorAndDate).forEach(collaborator => {
        entry[collaborator] = groupedByCollaboratorAndDate[collaborator][date] || 0;
      });
      return entry;
    });
  }, [filteredData]);

  // Agrupa os dados por categoria para o gráfico de distribuição.
  const categoryData = useMemo(() => {
    const grouped: { [key: string]: number } = {};
    filteredData.forEach(item => {
      if (!grouped[item.category]) {
        grouped[item.category] = 0;
      }
      grouped[item.category] += item.items;
    });

    return Object.entries(grouped).map(([category, items]) => ({
      name: category,
      value: items as number,
    }));
  }, [filteredData]);

  // Agrupa os dados por colaborador para o gráfico de comparação.
  const collaboratorComparison = useMemo(() => {
    const grouped: { [key: string]: number } = {};
    filteredData.forEach(item => {
      if (!grouped[item.collaborator]) {
        grouped[item.collaborator] = 0;
      }
      grouped[item.collaborator] += item.items;
    });

    return Object.entries(grouped).map(([name, items]) => ({
      name,
      items,
      avg: (items / (metrics.totalDays || 1)),
    }));
  }, [filteredData, metrics.totalDays]);

  // Cria uma lista única de nomes de colaboradores para o filtro.
  const collaboratorNames = useMemo(() => {
    const namesFromData = new Set(data.map(item => item.collaborator));
    const namesFromCollaborators = new Set(collaborators.map(c => c.name));
    return ['all', ...Array.from(new Set([...namesFromData, ...namesFromCollaborators]))];
  }, [data, collaborators]);

  // Retorna todos os dados calculados para serem usados pelos componentes.
  return { 
    metrics, 
    dailyData, 
    categoryData, 
    collaboratorComparison, 
    collaboratorNames,
    dailyCollaboratorData,
  };
};