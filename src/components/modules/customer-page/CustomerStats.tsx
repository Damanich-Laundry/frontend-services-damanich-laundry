"use client";

import React from 'react';
import { Box } from '@mui/material';
import { Users, UserPlus, ShoppingCart, UserCheck } from 'lucide-react';
import { StatCard } from '@/components/shared';
import {  CustomerStatsData } from './types';

interface CustomerStatsProps {
  stats: CustomerStatsData;
}

export default function CustomerStats({ stats }: CustomerStatsProps) {
  return (
    <Box sx={{ 
      display: 'grid', 
      gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
      gap: 3 
    }}>
      <StatCard
        title="Total Pelanggan"
        value={stats.totalCustomer}
        icon={Users}
        iconColor="text-blue-600"
        iconBgColor="bg-blue-100"
      />
      <StatCard
        title="Pelanggan Baru Bulan Ini"
        value={stats.newCustomer}
        icon={UserPlus}
        iconColor="text-green-600"
        iconBgColor="bg-green-100"
      />
      <StatCard
        title="Total Pesanan"
        value={stats.totalOrder}
        icon={ShoppingCart}
        iconColor="text-red-600"
        iconBgColor="bg-red-100"
      />
      <StatCard
        title="Pelanggan Aktif"
        value={stats.activeCustomer}
        icon={UserCheck}
        iconColor="text-yellow-600"
        iconBgColor="bg-yellow-100"
      />
    </Box>
  );
}

