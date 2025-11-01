import React, { useState, useEffect } from 'react';
import { TrendingUp, Package, Clock, Users, Calendar, AlertTriangle } from 'lucide-react';
import Filters, { Period } from './Filters';
import FileUpload from './FileUpload';
import MetricCard from './MetricCard';
import ProductivityChart from './ProductivityChart';
import CategoryChart from './CategoryChart';
import CollaboratorChart from './CollaboratorChart';
import { useProductivityData } from '../hooks/useProductivityData';
import RegisterCollaborator from './RegisterCollaborator';
import CollaboratorList from './CollaboratorList';
import ProjectStatus from './ProjectStatus';

import { projectPlan as initialProjectPlan } from '../data/projectPlan';

// A interface RawData deve corresponder à estrutura das suas planilhas
interface RawData { [key: string]: any; }

interface Collaborator {
  name: string;
  area: string;
}

const formatDate = (date: Date) => date.toISOString().split('T')[0];

const ProductivityDashboard = () => {
  // Gerencia o estado principal da aplicação (filtros, dados, etc.).
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('daily');
  const [startDate, setStartDate] = useState(formatDate(new Date()));
  const [endDate, setEndDate] = useState(formatDate(new Date()));
  const [selectedCollaborator, setSelectedCollaborator] = useState('all');
  const [uploadedData, setUploadedData] = useState<RawData[]>(() => {
    const savedData = localStorage.getItem('uploadedData');
    return savedData ? JSON.parse(savedData) : [];
  });
  const [collaborators, setCollaborators] = useState<Collaborator[]>(() => {
    const savedCollaborators = localStorage.getItem('collaborators');
    return savedCollaborators ? JSON.parse(savedCollaborators) : [];
  });
  const [projectPlanData, setProjectPlanData] = useState(() => {
    const savedPlan = localStorage.getItem('projectPlanData');
    return savedPlan ? JSON.parse(savedPlan) : initialProjectPlan;
  });

  // Processa e calcula os dados para exibição nos gráficos e métricas.
  const { 
    metrics, 
    dailyData, 
    categoryData, 
    collaboratorComparison, 
    collaboratorNames 
  } = useProductivityData(uploadedData, startDate, endDate, selectedCollaborator, collaborators);

  // Salva as alterações de estado no localStorage para persistência dos dados.
  useEffect(() => {
    localStorage.setItem('uploadedData', JSON.stringify(uploadedData));
  }, [uploadedData]);

  useEffect(() => {
    localStorage.setItem('collaborators', JSON.stringify(collaborators));
  }, [collaborators]);

  useEffect(() => {
    localStorage.setItem('projectPlanData', JSON.stringify(projectPlanData));
  }, [projectPlanData]);

  // Atualiza as datas de início e fim com base no período de tempo selecionado.
  useEffect(() => {
    const today = new Date();
    let newStartDate = new Date(today);
    let newEndDate = new Date(today);

    switch (selectedPeriod) {
      case 'daily':
        return;
      case 'weekly':
        newStartDate.setDate(today.getDate() - 6);
        break;
      case 'biweekly':
        newStartDate.setDate(today.getDate() - 14);
        break;
      case 'monthly':
        newStartDate = new Date(today.getFullYear(), today.getMonth(), 1);
        newEndDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        break;
    }

    setStartDate(formatDate(newStartDate));
    setEndDate(formatDate(newEndDate));
  }, [selectedPeriod]);

  // Atualiza o estado do plano de projeto quando ele é editado.
  const handlePlanChange = (newPlanData: any) => {
    setProjectPlanData(newPlanData);
  };

  // Adiciona um novo colaborador à lista.
  const handleCollaboratorRegistered = (name: string, area: string) => {
    setCollaborators(prev => [...prev, { name, area }]);
  };

  // Remove um colaborador da lista.
  const handleDeleteCollaborator = (name: string) => {
    setCollaborators(prev => prev.filter(c => c.name !== name));
  };

  // Processa os dados da planilha e substitui os dados do colaborador.
  const handleDataLoaded = (newData: RawData[], collaboratorName: string) => {
    const taggedData = newData.map(row => ({
        ...row,
        'collaborator': collaboratorName
    }));

    setUploadedData(prevData => {
      // Filtra os dados, mantendo apenas os de outros colaboradores.
      const otherCollaboratorsData = prevData.filter(
        row => row.collaborator !== collaboratorName
      );
      // Retorna os dados dos outros junto com os novos dados do colaborador atual.
      return [...otherCollaboratorsData, ...taggedData];
    });
  };

  // Limpa todos os dados do localStorage e recarrega a aplicação.
  const handleClearData = () => {
    if (window.confirm('Você tem certeza que deseja limpar todos os dados? Essa ação não pode ser desfeita.')) {
      localStorage.removeItem('uploadedData');
      localStorage.removeItem('collaborators');
      localStorage.removeItem('projectPlanData'); // Garante que o plano também seja limpo.
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3 mb-2">
                <TrendingUp className="text-blue-600" size={36} />
                Dashboard de Produtividade
              </h1>
              <p className="text-gray-600">Análise de itens cadastrados por período</p>
            </div>
            <button 
              onClick={handleClearData}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors"
            >
              <AlertTriangle size={16} />
              Limpar Dados
            </button>
          </div>
        </div>

        {/* Status do Projeto */}
        <ProjectStatus 
          uploadedData={uploadedData} 
          projectPlanData={projectPlanData}
          onPlanChange={handlePlanChange}
        />

        {/* Componente de Cadastro de Colaborador */}
        <RegisterCollaborator onCollaboratorRegistered={handleCollaboratorRegistered} />

        {/* Lista de Colaboradores */}
        <CollaboratorList collaborators={collaborators} onDeleteCollaborator={handleDeleteCollaborator} />

        {/* Componente de Upload */}
        <FileUpload onDataLoaded={handleDataLoaded} collaborators={collaborators} />

        {/* Filtros */}
        <Filters 
          selectedPeriod={selectedPeriod}
          setSelectedPeriod={setSelectedPeriod}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          selectedCollaborator={selectedCollaborator}
          setSelectedCollaborator={setSelectedCollaborator}
          collaborators={collaboratorNames}
        />

        {/* Cards de Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
          <MetricCard icon={Package} title="Total Geral" value={metrics.grandTotalItems} description="Itens cadastrados (total)" color="from-red-500 to-red-600" />
          <MetricCard icon={Package} title="Total" value={metrics.totalItems} description="Itens cadastrados (período)" color="from-blue-500 to-blue-600" />
          <MetricCard icon={Calendar} title="Média" value={metrics.avgDaily.toFixed(1)} description="Itens por dia" color="from-green-500 to-green-600" />
          <MetricCard icon={Clock} title="Produtividade" value={metrics.avgHourly.toFixed(1)} description="Itens por hora" color="from-orange-500 to-orange-600" />
          <MetricCard icon={Users} title="Período" value={metrics.totalDays} description="Dias trabalhados" color="from-purple-500 to-purple-600" />
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <ProductivityChart data={dailyData} />
          <CategoryChart data={categoryData} />
        </div>

        {/* Comparação de Colaboradores */}
        <CollaboratorChart data={collaboratorComparison} />

      </div>

      <footer className="text-center text-sm text-gray-500 py-4 mt-8">
        <p>&copy; 2025 Leandro Ferraz. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default ProductivityDashboard;