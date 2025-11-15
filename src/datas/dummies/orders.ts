// New structure for orders page
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

// Legacy structure for dashboard (backward compatibility)
export interface LegacyOrder {
  id: string;
  customer: string;
  amount: string;
  status: string;
  avatar: string;
  avatarColor: string;
}

export interface OrderTableRow {
  orderNumber: string;
  customerName: string;
  status: string;
  total: string;
  date: string;
}

export const mockOrders: Order[] = [
  { 
    id: "1",
    orderNumber: "#ORD-001", 
    customerName: "Kevin", 
    serviceType: "Cuci Kering",
    status: "Selesai",
    totalPrice: "Rp 45.000",
    orderDate: "15 Jan 2025"
  },
  { 
    id: "2",
    orderNumber: "#ORD-002", 
    customerName: "Damanik", 
    serviceType: "Cuci Setrika",
    status: "Dalam Proses",
    totalPrice: "Rp 60.000",
    orderDate: "16 Jan 2025"
  },
  { 
    id: "3",
    orderNumber: "#ORD-003", 
    customerName: "Rama", 
    serviceType: "Dry Clean",
    status: "Menunggu",
    totalPrice: "Rp 120.000",
    orderDate: "17 Jan 2025"
  },
  { 
    id: "4",
    orderNumber: "#ORD-004", 
    customerName: "Andi", 
    serviceType: "Cuci Kering",
    status: "Selesai",
    totalPrice: "Rp 35.000",
    orderDate: "18 Jan 2025"
  },
  { 
    id: "5",
    orderNumber: "#ORD-005", 
    customerName: "Sari", 
    serviceType: "Cuci Setrika",
    status: "Dalam Proses",
    totalPrice: "Rp 55.000",
    orderDate: "18 Jan 2025"
  },
  { 
    id: "6",
    orderNumber: "#ORD-006", 
    customerName: "Budi", 
    serviceType: "Dry Clean",
    status: "Menunggu",
    totalPrice: "Rp 80.000",
    orderDate: "18 Jan 2025"
  },
  { 
    id: "7",
    orderNumber: "#ORD-007", 
    customerName: "Lina", 
    serviceType: "Cuci Kering",
    status: "Selesai",
    totalPrice: "Rp 40.000",
    orderDate: "19 Jan 2025"
  },
  { 
    id: "8",
    orderNumber: "#ORD-008", 
    customerName: "Rudi", 
    serviceType: "Cuci Setrika",
    status: "Dibatalkan",
    totalPrice: "Rp 50.000",
    orderDate: "19 Jan 2025"
  },
  { 
    id: "9",
    orderNumber: "#ORD-009", 
    customerName: "Maya", 
    serviceType: "Dry Clean",
    status: "Selesai",
    totalPrice: "Rp 100.000",
    orderDate: "20 Jan 2025"
  },
  { 
    id: "10",
    orderNumber: "#ORD-010", 
    customerName: "Joko", 
    serviceType: "Cuci Kering",
    status: "Dalam Proses",
    totalPrice: "Rp 30.000",
    orderDate: "20 Jan 2025"
  },
  { 
    id: "11",
    orderNumber: "#ORD-011", 
    customerName: "Sinta", 
    serviceType: "Cuci Setrika",
    status: "Menunggu",
    totalPrice: "Rp 65.000",
    orderDate: "21 Jan 2025"
  },
  { 
    id: "12",
    orderNumber: "#ORD-012", 
    customerName: "Ahmad", 
    serviceType: "Dry Clean",
    status: "Selesai",
    totalPrice: "Rp 90.000",
    orderDate: "21 Jan 2025"
  },
  { 
    id: "13",
    orderNumber: "#ORD-013", 
    customerName: "Nina", 
    serviceType: "Cuci Kering",
    status: "Selesai",
    totalPrice: "Rp 42.000",
    orderDate: "22 Jan 2025"
  },
  { 
    id: "14",
    orderNumber: "#ORD-014", 
    customerName: "Tono", 
    serviceType: "Cuci Setrika",
    status: "Dalam Proses",
    totalPrice: "Rp 58.000",
    orderDate: "22 Jan 2025"
  },
  { 
    id: "15",
    orderNumber: "#ORD-015", 
    customerName: "Dewi", 
    serviceType: "Dry Clean",
    status: "Menunggu",
    totalPrice: "Rp 110.000",
    orderDate: "23 Jan 2025"
  },
  { 
    id: "16",
    orderNumber: "#ORD-016", 
    customerName: "Eko", 
    serviceType: "Cuci Kering",
    status: "Selesai",
    totalPrice: "Rp 38.000",
    orderDate: "23 Jan 2025"
  },
  { 
    id: "17",
    orderNumber: "#ORD-017", 
    customerName: "Fitri", 
    serviceType: "Cuci Setrika",
    status: "Selesai",
    totalPrice: "Rp 52.000",
    orderDate: "24 Jan 2025"
  },
  { 
    id: "18",
    orderNumber: "#ORD-018", 
    customerName: "Gus", 
    serviceType: "Dry Clean",
    status: "Dalam Proses",
    totalPrice: "Rp 95.000",
    orderDate: "24 Jan 2025"
  },
  { 
    id: "19",
    orderNumber: "#ORD-019", 
    customerName: "Hani", 
    serviceType: "Cuci Kering",
    status: "Menunggu",
    totalPrice: "Rp 33.000",
    orderDate: "25 Jan 2025"
  },
  { 
    id: "20",
    orderNumber: "#ORD-020", 
    customerName: "Ivan", 
    serviceType: "Cuci Setrika",
    status: "Selesai",
    totalPrice: "Rp 48.000",
    orderDate: "25 Jan 2025"
  },
  { 
    id: "21",
    orderNumber: "#ORD-021", 
    customerName: "Jaya", 
    serviceType: "Dry Clean",
    status: "Selesai",
    totalPrice: "Rp 105.000",
    orderDate: "26 Jan 2025"
  },
  { 
    id: "22",
    orderNumber: "#ORD-022", 
    customerName: "Kiki", 
    serviceType: "Cuci Kering",
    status: "Dalam Proses",
    totalPrice: "Rp 36.000",
    orderDate: "26 Jan 2025"
  },
  { 
    id: "23",
    orderNumber: "#ORD-023", 
    customerName: "Lia", 
    serviceType: "Cuci Setrika",
    status: "Menunggu",
    totalPrice: "Rp 62.000",
    orderDate: "27 Jan 2025"
  },
  { 
    id: "24",
    orderNumber: "#ORD-024", 
    customerName: "Mario", 
    serviceType: "Dry Clean",
    status: "Selesai",
    totalPrice: "Rp 115.000",
    orderDate: "27 Jan 2025"
  },
];

export const mockOrdersStats: OrdersStatsData = {
  totalToday: 24,
  completed: 18,
  inProcess: 4,
  newOrders: 2
};

// Legacy data for dashboard (backward compatibility)
export const mockOrdersLegacy: LegacyOrder[] = [
  { 
    id: "ORD-001", 
    customer: "Kevin", 
    amount: "Rp 45.000", 
    status: "Proses", 
    avatar: "K", 
    avatarColor: "bg-blue-100 text-blue-600" 
  },
  { 
    id: "ORD-002", 
    customer: "Damanik", 
    amount: "Rp 32.000", 
    status: "Selesai", 
    avatar: "D", 
    avatarColor: "bg-green-100 text-green-600" 
  },
  { 
    id: "ORD-003", 
    customer: "Andi", 
    amount: "Rp 28.000", 
    status: "Baru", 
    avatar: "A", 
    avatarColor: "bg-purple-100 text-purple-600" 
  },
];

export const mockOrderTableData: OrderTableRow[] = [
  { orderNumber: "#ORD-001", customerName: "Kevin", status: "Dalam Proses", total: "Rp 45.000", date: "15 Jan 2025" },
  { orderNumber: "#ORD-002", customerName: "Damanik", status: "Selesai", total: "Rp 60.000", date: "16 Jan 2025" },
  { orderNumber: "#ORD-003", customerName: "Rama", status: "Menunggu", total: "Rp 120.000", date: "17 Jan 2025" },
];

