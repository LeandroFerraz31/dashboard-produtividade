import { Filter } from 'lucide-react';

// Define os tipos de período de tempo que podem ser selecionados.
export type Period = 'daily' | 'weekly' | 'biweekly' | 'monthly';

// Define as propriedades que o componente Filters recebe do componente pai.
interface FiltersProps {
  selectedPeriod: Period;
  setSelectedPeriod: (value: Period) => void;
  startDate: string;
  setStartDate: (value: string) => void;
  endDate: string;
  setEndDate: (value: string) => void;
  selectedCollaborator: string;
  setSelectedCollaborator: (value: string) => void;
  collaborators: string[];
}

const Filters: React.FC<FiltersProps> = ({
  selectedPeriod,
  setSelectedPeriod,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  selectedCollaborator,
  setSelectedCollaborator,
  collaborators,
}) => {
  // Desabilita os seletores de data se o período não for 'daily'.
  const areDatesDisabled = selectedPeriod !== 'daily';

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="text-gray-600" size={20} />
        <h2 className="text-xl font-semibold text-gray-800">Filtros</h2>
      </div>

      {/* Estrutura do formulário com os campos de filtro. */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div>
          <label htmlFor="period-select" className="block text-sm font-medium text-gray-700 mb-2">Período</label>
          <select
            id="period-select"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value as Period)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="daily">Diário</option>
            <option value="weekly">Semanal</option>
            <option value="biweekly">Quinzenal</option>
            <option value="monthly">Mensal</option>
          </select>
        </div>

        <div>
          <label htmlFor="start-date-input" className="block text-sm font-medium text-gray-700 mb-2">Data Inicial</label>
          <input
            id="start-date-input"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
            disabled={areDatesDisabled}
          />
        </div>

        <div>
          <label htmlFor="end-date-input" className="block text-sm font-medium text-gray-700 mb-2">Data Final</label>
          <input
            id="end-date-input"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
            disabled={areDatesDisabled}
          />
        </div>

        <div>
          <label htmlFor="collaborator-select" className="block text-sm font-medium text-gray-700 mb-2">Colaborador</label>
          <select
            id="collaborator-select"
            value={selectedCollaborator}
            onChange={(e) => setSelectedCollaborator(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {collaborators.map((collab, index) => (
              <option key={`${collab}-${index}`} value={collab}>
                {collab === 'all' ? 'Todos' : collab}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filters;