export interface Customer {
  id: string;
  name: string;
  phone: string;
  address: string;
}

export const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'Kevin',
    phone: '+62 812-3456-7890',
    address: 'Jl. Sudirman No. 123, Jakarta Pusat'
  },
  {
    id: '2',
    name: 'Damanik',
    phone: '+62 813-4567-8901',
    address: 'Jl. Thamrin No. 45, Jakarta Selatan'
  },
  {
    id: '3',
    name: 'Rama',
    phone: '+62 814-5678-9012',
    address: 'Jl. Gatot Subroto No. 78, Jakarta Barat'
  },
  {
    id: '4',
    name: 'Andi',
    phone: '+62 815-6789-0123',
    address: 'Jl. Jendral Sudirman No. 56, Jakarta Pusat'
  },
  {
    id: '5',
    name: 'Sari',
    phone: '+62 816-7890-1234',
    address: 'Jl. Kebon Jeruk No. 90, Jakarta Barat'
  },
];

