import { apiClient } from '@/lib/apiClient';

export interface UserRecord {
  id: number;
  username: string;
  email: string;
  password_hash: string;
  full_name: string;
  role: string;
  phone: string;
  is_active: boolean;
  createdAt: string;
  updatedAt: string;
}

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

export interface CreateUserPayload {
  username: string;
  email: string;
  password: string;
  full_name: string;
  role: string;
  phone: string;
}

export interface UpdateUserPayload {
  username?: string;
  email?: string;
  password?: string;
  full_name?: string;
  role?: string;
  phone?: string;
  is_active?: boolean;
}

export interface UserDetailResponse {
  success?: boolean;
  message?: string;
  data?: UserRecord;
  errors?: unknown;
}

export const staffService = {
  async getUsers(): Promise<UserRecord[]> {
    const { data } = await apiClient.get<UserRecord[]>('/users');
    return Array.isArray(data) ? data : [];
  },

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

  async getUserById(userId: string | number): Promise<UserRecord> {
    const { data } = await apiClient.get<UserRecord>(`/users/${userId}`);
    return data;
  },

  async createUser(payload: CreateUserPayload): Promise<UserRecord> {
    const { data } = await apiClient.post<UserRecord | UserDetailResponse>('/users', payload);
    if ('data' in data && data.data) {
      return data.data;
    }
    return data as UserRecord;
  },

  async updateUser(
    userId: string | number,
    payload: UpdateUserPayload
  ): Promise<UserRecord> {
    const { data } = await apiClient.put<UserRecord | UserDetailResponse>(
      `/users/${userId}`,
      payload
    );
    if ('data' in data && data.data) {
      return data.data;
    }
    return data as UserRecord;
  },

  async deleteUser(userId: string | number): Promise<void> {
    await apiClient.delete(`/users/${userId}`);
  },
};

