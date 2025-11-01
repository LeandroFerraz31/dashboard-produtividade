import { LucideIcon } from 'lucide-react';

// Define as propriedades para o card de métrica.
interface MetricCardProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
  description: string;
  color: string;
}

// Componente reutilizável para exibir uma métrica individual no dashboard.
const MetricCard: React.FC<MetricCardProps> = ({ icon: Icon, title, value, description, color }) => {
  return (
    <div className={`bg-gradient-to-br ${color} rounded-xl shadow-lg p-6 text-white`}>
      <div className="flex items-center justify-between mb-2">
        <Icon size={32} />
        <span className="text-sm opacity-90">{title}</span>
      </div>
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-sm opacity-90 mt-1">{description}</div>
    </div>
  );
};

export default MetricCard;
