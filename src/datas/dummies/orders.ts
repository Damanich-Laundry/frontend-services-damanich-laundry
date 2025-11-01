export interface Order {
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
  { orderNumber: "#LD001", customerName: "Kevin Sipahutar", status: "Dalam Proses", total: "Rp 45.000", date: "15 Jan 2025" },
  { orderNumber: "#LD002", customerName: "Damanik", status: "Selesai", total: "Rp 32.000", date: "15 Jan 2025" },
];

