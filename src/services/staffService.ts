import { apiClient } from '@/lib/apiClient';

export interface StaffRecord {
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

export interface StaffsResponse {
  success: boolean;
  message: string;
  data: StaffRecord[];
  errors?: unknown;
}

export interface StaffDetailResponse {
  success: boolean;
  message: string;
  data: StaffRecord;
  errors?: unknown;
}

export interface CreateStaffPayload {
  name: string;
  phone: string;
  email: string;
  address: string;
}

export interface UpdateStaffPayload {
  name: string;
  phone: string;
  email: string;
  address: string;
}

export const staffService = {
  async getStaffs(): Promise<StaffRecord[]> {
    const { data } = await apiClient.get<StaffsResponse>('/staffs');
    return data.data ?? [];
  },

  async getStaffById(
    staffId: string | number
  ): Promise<StaffRecord> {
    const { data } = await apiClient.get<StaffDetailResponse>(
      `/staffs/${staffId}`
    );
    return data.data;
  },

  async createStaff(payload: CreateStaffPayload): Promise<StaffRecord> {
    const { data } = await apiClient.post<StaffDetailResponse>('/staffs', payload);
    return data.data;
  },

  async updateStaff(
    staffId: string | number,
    payload: UpdateStaffPayload
  ): Promise<StaffRecord> {
    const { data } = await apiClient.put<StaffDetailResponse>(
      `/staffs/${staffId}`,
      payload
    );
    return data.data;
  },
};

