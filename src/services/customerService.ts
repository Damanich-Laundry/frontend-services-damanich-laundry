import { apiClient } from '@/lib/apiClient';

export interface CustomerRecord {
  id: number;
  name: string;
  phone: string | null;
  email: string | null;
  address: string | null;
  member_since: string | null;
  total_orders: number;
  loyalty_points: number;
  createdAt: string;
  updatedAt: string;
}

export interface CustomersResponse {
  success: boolean;
  message: string;
  data: CustomerRecord[];
  errors?: unknown;
}

export const customerService = {
  async getCustomers(): Promise<CustomerRecord[]> {
    const { data } = await apiClient.get<CustomersResponse>('/customers');
    return data.data ?? [];
  },
};

