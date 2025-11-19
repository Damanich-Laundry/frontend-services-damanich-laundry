import { apiClient } from '@/lib/apiClient';

export interface ServiceRecord {
  id: number;
  service_name: string;
  service_type: string;
  unit: string;
  price_per_unit: number;
  duration_hours: number;
  is_active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ServicesResponse {
  status: string;
  message: string;
  data: ServiceRecord[];
  errors?: unknown;
}

export const serviceService = {
  async getServices(): Promise<ServiceRecord[]> {
    const { data } = await apiClient.get<ServicesResponse>('/services');
    return data.data ?? [];
  },
};


