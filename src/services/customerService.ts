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

export interface CustomerDetailResponse {
  success: boolean;
  message: string;
  data: CustomerRecord;
  errors?: unknown;
}

export interface CreateCustomerPayload {
  name: string;
  phone: string;
  email: string;
  address: string;
}

export interface UpdateCustomerPayload {
  name: string;
  phone: string;
  email: string;
  address: string;
}

export const customerService = {
  async getCustomers(): Promise<CustomerRecord[]> {
    const { data } = await apiClient.get<CustomersResponse>('/customers');
    return data.data ?? [];
  },

  async getCustomerById(
    customerId: string | number
  ): Promise<CustomerRecord> {
    const { data } = await apiClient.get<CustomerDetailResponse>(
      `/customers/${customerId}`
    );
    return data.data;
  },

  async createCustomer(payload: CreateCustomerPayload): Promise<CustomerRecord> {
    const { data } = await apiClient.post<CustomerDetailResponse>('/customers', payload);
    return data.data;
  },

  async updateCustomer(
    customerId: string | number,
    payload: UpdateCustomerPayload
  ): Promise<CustomerRecord> {
    const { data } = await apiClient.put<CustomerDetailResponse>(
      `/customers/${customerId}`,
      payload
    );
    return data.data;
  },
};

