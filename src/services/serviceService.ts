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

export interface ServiceDetailResponse {
  status: string;
  message: string;
  data: ServiceRecord;
  errors?: unknown;
}

export interface UpdateServicePayload {
  service_name: string;
  service_type: string;
  unit: string;
  price_per_unit: number;
  duration_hours: number;
}

export const serviceService = {
  async getServices(): Promise<ServiceRecord[]> {
    const { data } = await apiClient.get<ServicesResponse>('/services');
    return data.data ?? [];
  },

  async getServiceById(serviceId: string | number): Promise<ServiceRecord> {
    const { data } = await apiClient.get<ServiceDetailResponse>(
      `/services/${serviceId}`
    );
    return data.data;
  },

  async updateService(
    serviceId: string | number,
    payload: UpdateServicePayload
  ): Promise<ServiceRecord> {
    const { data } = await apiClient.patch<ServiceDetailResponse>(
      `/services/${serviceId}`,
      payload
    );
    return data.data;
  },
};


