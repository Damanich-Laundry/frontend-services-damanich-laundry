export interface Service {
  id: string;
  name: string;
  description: string;
  estimatedTime: string;
  pricePerKg: string;
  status: 'Aktif' | 'Nonaktif';
}

export interface ServicesStatsData {
  total: number;
  active: number;
  inactive: number;
  popular: number;
}

