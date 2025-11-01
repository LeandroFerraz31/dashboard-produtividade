import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { MousePointer2 } from 'lucide-react';

interface CategoryData {
  name: string;
  value: number;
}

interface CategoryChartProps {
  data: CategoryData[];
}

// Define a paleta de cores para os segmentos do gráfico.
const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const CategoryChart: React.FC<CategoryChartProps> = ({ data }) => {
  // Exibe um placeholder quando não há dados disponíveis.
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-center h-[362px]">
        <p className="text-gray-500">Sem dados para exibir.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800">Distribuição por Categoria</h3>
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <MousePointer2 size={16} />
        <span>Passe o mouse sobre o gráfico para ver detalhes.</span>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            // Formata o rótulo de cada segmento para exibir nome e percentual.
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {/* Itera sobre os dados para aplicar uma cor a cada segmento. */}
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              border: '1px solid #ccc',
              borderRadius: '0.5rem',
            }}
            // Formata o conteúdo da dica de contexto (tooltip).
            formatter={(value: number) => [`${value} itens`, 'Total']}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryChart;