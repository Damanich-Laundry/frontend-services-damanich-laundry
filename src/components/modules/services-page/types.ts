export interface Service {
  id: string;
  name: string;
  description: string;
  estimatedTime: string;
  pricePerKg: string;
  status: 'Aktif' | 'Nonaktif';
  unit?: string;
  serviceType?: string;
  durationHours?: number;
  pricePerUnitRaw?: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ServicesStatsData {
  total: number;
  active: number;
  inactive: number;
  popular: number;
}

