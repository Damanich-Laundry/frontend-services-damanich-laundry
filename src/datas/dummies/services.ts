import { Service } from '@/components/modules/services-page/types';

export const mockServices: Service[] = [
  {
    id: '1',
    name: 'Cuci Kering',
    description: 'Cuci dan keringkan pakaian standar',
    estimatedTime: '2 Hari',
    pricePerKg: 'Rp 8.000',
    status: 'Aktif'
  },
  {
    id: '2',
    name: 'Cuci Setrika',
    description: 'Cuci, kering, dan setrika rapi',
    estimatedTime: '3 Hari',
    pricePerKg: 'Rp 12.000',
    status: 'Aktif'
  },
  {
    id: '3',
    name: 'Express 1 Hari',
    description: 'Layanan cepat dalam 1 hari',
    estimatedTime: '1 Hari',
    pricePerKg: 'Rp 15.000',
    status: 'Aktif'
  },
  {
    id: '4',
    name: 'Dry Clean',
    description: 'Cuci kering untuk pakaian khusus',
    estimatedTime: '4 Hari',
    pricePerKg: 'Rp 25.000',
    status: 'Nonaktif'
  }
];

export const mockService: Service = {
  id: '1',
  name: 'Cuci Kering',
  description: 'Layanan cuci dan pengeringan untuk pakaian sehari-hari dengan deterjen berkualitas',
  estimatedTime: '2 Hari',
  pricePerKg: 'Rp 8.000',
  status: 'Aktif'
};

