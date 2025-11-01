import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MousePointer2 } from 'lucide-react';

interface ProductivityData {
  date: string; // Formato 'DD/MM'
  [collaborator: string]: number | string; // Nomes dos colaboradores como chaves
}

interface ProductivityChartProps {
  data: ProductivityData[];
  collaborators: string[];
}

// Paleta de cores para as linhas do gráfico
const COLORS = ['#3b82f6', '#10b981', '#ef4444', '#f97316', '#8b5cf6', '#ec4899', '#14b8a6', '#eab308'];

const ProductivityChart: React.FC<ProductivityChartProps> = ({ data, collaborators }) => {
  // Exibe um placeholder se não houver dados para o gráfico.
  if (!data || data.length === 0 || collaborators.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-center h-[362px]">
        <p className="text-gray-500">Sem dados para exibir.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800">Evolução Diária por Colaborador</h3>
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <MousePointer2 size={16} />
        <span>Passe o mouse sobre o gráfico para ver detalhes.</span>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              border: '1px solid #ccc',
              borderRadius: '0.5rem',
            }}
            // Formata o rótulo do eixo X exibido na dica de contexto.
            labelFormatter={(label: string) => `Dia: ${label}`}
          />
          <Legend />
          {/* Define as linhas do gráfico, uma para cada colaborador. */}
          {collaborators.map((collab, index) => (
            <Line 
              key={collab} type="monotone" dataKey={collab} 
              stroke={COLORS[index % COLORS.length]} strokeWidth={2} name={collab} 
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProductivityChart;