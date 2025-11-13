export interface Staff {
    id: string;
    name: string;
    position: string;
    phone: string;
    shift: string;
    status: 'Aktif' | 'Non-Aktif' | 'Cuti';
    joinDate: string;
}


export interface StaffStatsData {
    totalStaff: number;
    staffActive: number;
    staffInactive: number;
    staffOnDuty: number;
}