export interface Staff {
  id: number;
  username: string;
  email: string;
  full_name: string;
  role: string;
  phone: string;
  is_active: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export type StaffStatus = 'Aktif' | 'Non-Aktif'


export interface StaffStatsData {
    totalStaff: number;
    staffActive: number;
    staffInactive: number;
    staffOnDuty: number;
}