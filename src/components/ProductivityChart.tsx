import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MousePointer2 } from 'lucide-react';

interface ProductivityData {
  date: string;
  items: number;
}

interface ProductivityChartProps {
  data: ProductivityData[];
}

const ProductivityChart: React.FC<ProductivityChartProps> = ({ data }) => {
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
      <h3 className="text-lg font-semibold text-gray-800">Evolução Diária</h3>
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
            // Formata o valor e o nome exibido na dica de contexto.
            formatter={(value: number) => [`${value} itens`, 'Itens']}
            // Formata o rótulo do eixo X exibido na dica de contexto.
            labelFormatter={(label: string) => `Dia: ${label}`}
          />
          <Legend />
          {/* Define a linha do gráfico, seus dados e aparência. */}
          <Line type="monotone" dataKey="items" stroke="#3b82f6" strokeWidth={2} name="Itens" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProductivityChart;