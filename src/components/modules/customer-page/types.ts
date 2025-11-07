export interface Customer {
    id: string;
    name: string;
    phone: string;
    address: string;
    totalTransaction: string;
    registeredDate: string;
}


export interface CustomerStatsData {
    totalCustomer: number;
    newCustomer: number;
    totalOrder: number;
    activeCustomer: number;
}