import React, { useState } from 'react';
import { CategoryPlan } from '../data/projectPlan';
import { Target, CheckCircle, AlertTriangle, Clock, Calendar, ChevronDown, ChevronRight } from 'lucide-react';

// Define a estrutura dos dados brutos vindos da planilha.
interface RawData {
  category: string;
  items: number;
  [key: string]: any;
}

// Define a estrutura do plano de projeto (que pode ser editado).
interface ProjectPlanData {
  totalProducts: number;
  endDate: string;
  categories: CategoryPlan[];
}

// Define as propriedades que o componente recebe.
interface ProjectStatusProps {
  uploadedData: RawData[];
  projectPlanData: ProjectPlanData;
  onPlanChange: (newPlanData: ProjectPlanData) => void;
}

// Estende o plano da categoria com dados de progresso em tempo real.
interface CategoryStatus extends CategoryPlan {
  completed: number;
  progress: number;
  status: 'on-track' | 'delayed' | 'completed' | 'pending';
}

const ProjectStatus: React.FC<ProjectStatusProps> = ({ uploadedData, projectPlanData, onPlanChange }) => {
  // Gerencia o estado de visibilidade (aberto/fechado) do painel.
  const [isOpen, setIsOpen] = useState(true);

  // Manipula a alteração da meta total de produtos do projeto.
  const handleTotalProductsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTotal = parseInt(e.target.value, 10);
    if (!isNaN(newTotal)) {
      onPlanChange({ ...projectPlanData, totalProducts: newTotal });
    }
  };

  // Manipula a alteração de um campo (meta ou data) de uma categoria específica.
  const handleCategoryChange = (categoryName: string, field: keyof CategoryPlan, value: string | number) => {
    const newCategories = projectPlanData.categories.map(cat => {
      if (cat.name === categoryName) {
        return { ...cat, [field]: value };
      }
      return cat;
    });
    onPlanChange({ ...projectPlanData, categories: newCategories });
  };

  // Calcula o progresso de cada categoria, recalculando apenas quando os dados mudam.
  const categoryProgress = React.useMemo<CategoryStatus[]>(() => {
    const completedByCategory: { [key: string]: number } = {};
    uploadedData.forEach(item => {
      if (item.category) {
        const categoryName = item.category.toUpperCase();
        completedByCategory[categoryName] = (completedByCategory[categoryName] || 0) + item.items;
      }
    });

    return projectPlanData.categories.map(plan => {
      const completed = completedByCategory[plan.name.toUpperCase()] || 0;
      const progress = plan.products > 0 ? (completed / plan.products) * 100 : 100;
      
      // Determina o status da categoria (concluído, atrasado, em andamento).
      let status: CategoryStatus['status'] = 'pending';
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const plannedEndDate = new Date(plan.endDate);

      if (progress >= 100) {
        status = 'completed';
      } else if (today > plannedEndDate) {
        status = 'delayed';
      } else {
        status = 'on-track';
      }

      return { ...plan, completed, progress, status };
    });
  }, [uploadedData, projectPlanData]);

  // Calcula os totais gerais de progresso para o resumo.
  const totalCompleted = uploadedData.reduce((sum, item) => sum + (item.items || 0), 0);
  const totalProgress = projectPlanData.totalProducts > 0 ? (totalCompleted / projectPlanData.totalProducts) * 100 : 0;
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const deadline = new Date(projectPlanData.endDate);
  const daysLeft = Math.max(0, Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));

  // Retorna o ícone e o estilo de acordo com o status da categoria.
  const getStatusIndicator = (status: CategoryStatus['status']) => {
    const statusInfo = {
      completed: { icon: <CheckCircle />, color: 'text-green-500', label: 'Concluído' },
      delayed: { icon: <AlertTriangle />, color: 'text-red-500', label: 'Atrasado' },
      'on-track': { icon: <Clock />, color: 'text-blue-500', label: 'Em andamento' },
      pending: { icon: <Clock />, color: 'text-gray-400', label: 'Pendente' },
    };
    const { icon, color, label } = statusInfo[status];
    return <span className={`flex items-center gap-1.5 ${color}`} title={label}>{React.cloneElement(icon, { size: 16 })}{label}</span>;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <button 
        className="w-full flex justify-between items-center text-left mb-4" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          <Target className="text-gray-600" size={20} />
          <h2 className="text-xl font-semibold text-gray-800">Status do Projeto (Planejado vs. Real)</h2>
        </div>
        {isOpen ? <ChevronDown size={24} /> : <ChevronRight size={24} />}
      </button>

      {isOpen && (
        <div className="transition-all duration-500">
          {/* Overall Project Progress */}
          <div className="mb-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-bold text-gray-700 mb-2">Progresso Total do Projeto</h3>
            <div className="flex items-center gap-4">
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className="bg-blue-600 h-4 rounded-full transition-all duration-500"
                  style={{ width: `${totalProgress > 100 ? 100 : totalProgress.toFixed(2)}%` }}
                ></div>
              </div>
              <span className="font-bold text-blue-600 text-lg">{totalProgress.toFixed(2)}%</span>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-600 mt-2">
                <div className="flex items-center gap-1">
                  <span>{totalCompleted.toLocaleString('pt-BR')} / </span>
                                    <input
                                      id="total-products"
                                      type="number"
                                      value={projectPlanData.totalProducts}
                                      onChange={handleTotalProductsChange}
                                      onClick={(e) => e.stopPropagation()} // Prevent card from collapsing when clicking input
                                      className="w-24 text-sm p-1 border rounded-md"
                                    />                  <label htmlFor="total-products"> itens</label>
                </div>
                <span className='flex items-center gap-1'><Calendar size={14} /> {daysLeft > 0 ? `${daysLeft} dias restantes` : 'Prazo finalizado'}</span>
            </div>
          </div>

          {/* Category Progress Table */}
          <div>
            <h3 className="font-bold text-gray-700 mb-4">Progresso por Categoria</h3>
            <div className="overflow-x-auto max-h-[450px] pr-2">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 sticky top-0 z-10">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoria</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progresso</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Itens (Real/Meta)</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data Final</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {categoryProgress.map(cat => (
                    <tr key={cat.name} className='hover:bg-gray-50'>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-800">{cat.name}</td>
                      <td className="px-4 py-3 whitespace-nowrap w-1/3">
                        <div className="flex items-center gap-2">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${cat.progress > 100 ? 100 : cat.progress}%` }}></div>
                          </div>
                          <span className="text-sm text-gray-600">{cat.progress.toFixed(1)}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <span>{cat.completed.toLocaleString('pt-BR')} /</span>
                                                    <input
                                                      id={`category-${cat.name}-products`}
                                                      type="number"
                                                      value={cat.products}
                                                      onChange={(e) => handleCategoryChange(cat.name, 'products', parseInt(e.target.value, 10) || 0)}
                                                      onClick={(e) => e.stopPropagation()} // Prevent card from collapsing when clicking input
                                                      className="w-20 p-1 border rounded-md text-sm"
                                                    />                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                                                <input
                                                  id={`category-${cat.name}-endDate`}
                                                  type="date"
                                                  value={cat.endDate}
                                                  onChange={(e) => handleCategoryChange(cat.name, 'endDate', e.target.value)}
                                                  onClick={(e) => e.stopPropagation()} // Prevent card from collapsing when clicking input
                                                  className="p-1 border rounded-md text-sm"
                                                />                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">{getStatusIndicator(cat.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectStatus;