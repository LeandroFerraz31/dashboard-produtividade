
// Define a estrutura para o plano de cada categoria.
export interface CategoryPlan {
  name: string;
  products: number;
  workHours: string;
  days: number;
  startDate: string;
  endDate: string;
}

// Define a estrutura para os dados de ajuste de cronograma.
export interface AdjustmentPlan {
  name: string;
  value: number;
  percentage: number;
}

// Contém todos os dados do plano inicial do projeto.
export const projectPlan = {
  totalProducts: 114053,
  analystTarget: 650,
  totalAnalysts: 4,
  totalDays: 60,
  startDate: '2025-09-01',
  endDate: '2025-10-31',
  categories: [
    { name: 'MERCEARIA DOCE', products: 16413, workHours: '56:48', days: 6, startDate: '2025-09-01', endDate: '2025-09-09' },
    { name: 'MERCEARIA COMPLEMENTAR', products: 9615, workHours: '33:16', days: 4, startDate: '2025-09-09', endDate: '2025-09-15' },
    { name: 'MERCEARIA BÁSICA', products: 8115, workHours: '28:05', days: 3, startDate: '2025-09-15', endDate: '2025-09-18' },
    { name: 'MERCEARIA LÍQUIDA', products: 8534, workHours: '29:32', days: 3, startDate: '2025-09-18', endDate: '2025-09-23' },
    { name: 'MERCEARIA SALGADA', products: 3432, workHours: '11:52', days: 1, startDate: '2025-09-23', endDate: '2025-09-24' },
    { name: 'SAUDÁVEIS', products: 993, workHours: '3:26', days: 0, startDate: '2025-09-24', endDate: '2025-09-24' },
    { name: 'SAZONAIS', products: 476, workHours: '1:38', days: 0, startDate: '2025-09-24', endDate: '2025-09-24' },
    { name: 'LIMPEZA', products: 6902, workHours: '23:53', days: 3, startDate: '2025-09-24', endDate: '2025-09-29' },
    { name: 'HIGIENE E BELEZA', products: 14917, workHours: '51:38', days: 6, startDate: '2025-09-29', endDate: '2025-10-07' },
    { name: 'FARMÁCIA E PARAFARMACIA', products: 6419, workHours: '22:13', days: 2, startDate: '2025-10-07', endDate: '2025-10-09' },
    { name: 'PET SHOP', products: 3060, workHours: '10:35', days: 1, startDate: '2025-10-09', endDate: '2025-10-10' },
    { name: 'AUTOMOTIVOS', products: 682, workHours: '2:21', days: 0, startDate: '2025-10-10', endDate: '2025-10-10' },
    { name: 'FRIOS E LATÍCINIOS', products: 4638, workHours: '16:03', days: 2, startDate: '2025-10-10', endDate: '2025-10-14' },
    { name: 'HORTIFRUTI', products: 972, workHours: '3:21', days: 0, startDate: '2025-10-14', endDate: '2025-10-14' },
    { name: 'CONGELADOS', products: 4736, workHours: '16:23', days: 2, startDate: '2025-10-14', endDate: '2025-10-16' },
    { name: 'AÇOUGUE', products: 263, workHours: '0:54', days: 0, startDate: '2025-10-16', endDate: '2025-10-16' },
    { name: 'PADARIA', products: 1058, workHours: '3:39', days: 0, startDate: '2025-10-16', endDate: '2025-10-16' },
    { name: 'PEIXARIA', products: 28, workHours: '0:05', days: 0, startDate: '2025-10-16', endDate: '2025-10-16' },
    { name: 'ELETRÔNICOS E ELETRODOMÉSTICOS', products: 980, workHours: '3:23', days: 0, startDate: '2025-10-16', endDate: '2025-10-16' },
    { name: 'BAZAR', products: 21436, workHours: '74:12', days: 8, startDate: '2025-10-16', endDate: '2025-10-28' },
    { name: 'TABACO', products: 384, workHours: '1:19', days: 0, startDate: '2025-10-28', endDate: '2025-10-28' },
  ] as CategoryPlan[],
  adjustments: [
    { name: 'MERCEARIA', value: 47578, percentage: 41.72 },
    { name: 'HIGIENE E LIMPEZA (PET SHOP)', value: 31980, percentage: 28.04 },
    { name: 'PADARIA, AÇOUGUE, CONGELADOS, HORTI', value: 11695, percentage: 10.25 },
    { name: 'BAZAR, TABACO', value: 22800, percentage: 19.99 },
  ] as AdjustmentPlan[],
};
