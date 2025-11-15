"use client";

import React from 'react';
import { Box } from '@mui/material';
import { FileText, CheckCircle, Clock, Plus } from 'lucide-react';
import { StatCard } from '@/components/shared';
import { OrdersStatsData } from './types';

interface OrdersStatsProps {
  stats: OrdersStatsData;
}

export default function OrdersStats({ stats }: OrdersStatsProps) {
  return (
    <Box sx={{ 
      display: 'grid', 
      gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
      gap: 3 
    }}>
      <StatCard
        title="Total Pesanan Hari Ini"
        value={stats.totalToday}
        icon={FileText}
        iconColor="text-gray-600"
        iconBgColor="bg-gray-100"
      />
      <StatCard
        title="Pesanan Selesai"
        value={stats.completed}
        icon={CheckCircle}
        iconColor="text-green-600"
        iconBgColor="bg-green-100"
      />
      <StatCard
        title="Pesanan Dalam Proses"
        value={stats.inProcess}
        icon={Clock}
        iconColor="text-yellow-600"
        iconBgColor="bg-yellow-100"
      />
      <StatCard
        title="Pesanan Baru"
        value={stats.newOrders}
        icon={Plus}
        iconColor="text-blue-600"
        iconBgColor="bg-blue-100"
      />
    </Box>
  );
}

