import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MousePointer2 } from 'lucide-react';

interface CollaboratorData {
  name: string;
  items: number;
  avg: number;
}

interface CollaboratorChartProps {
  data: CollaboratorData[];
}

const CollaboratorChart: React.FC<CollaboratorChartProps> = ({ data }) => {
  // Exibe um placeholder se não houver dados para o gráfico.
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-center h-[362px]">
        <p className="text-gray-500">Sem dados para exibir.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800">Comparativo de Colaboradores</h3>
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <MousePointer2 size={16} />
        <span>Passe o mouse sobre o gráfico para ver detalhes.</span>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              border: '1px solid #ccc',
              borderRadius: '0.5rem',
            }}
            // Formata os valores exibidos na dica de contexto (tooltip).
            formatter={(value: any, name: string) => {
              if (name === 'Total de Itens') {
                return [value, 'Total de Itens'];
              }
              if (name === 'Média Diária') {
                // Garante que o valor é um número e não NaN antes de formatar.
                if (typeof value === 'number' && !isNaN(value)) {
                  return [value.toFixed(1), 'Média Diária'];
                }
                // Se não for um número válido, exibe 0.0 para evitar quebrar.
                return ['0.0', 'Média Diária'];
              }
              return [value, name];
            }}
          />
          <Legend />
          {/* Define a barra para o total de itens de cada colaborador. */}
          <Bar dataKey="items" fill="#3b82f6" name="Total de Itens" />
          {/* Define a barra para a média diária de itens. */}
          <Bar dataKey="avg" fill="#10b981" name="Média Diária" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CollaboratorChart;