export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  serviceType: string;
  status: 'Semua' | 'Menunggu' | 'Dalam Proses' | 'Selesai' | 'Dibatalkan';
  totalPrice: string;
  orderDate: string;
}

export interface OrdersStatsData {
  totalToday: number;
  completed: number;
  inProcess: number;
  newOrders: number;
}

