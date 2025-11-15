"use client";

import React from 'react';
import { Box } from '@mui/material';
import { List, CheckCircle, XCircle, Star } from 'lucide-react';
import { StatCard } from '@/components/shared';
import { ServicesStatsData } from './types';

interface ServicesStatsProps {
  stats: ServicesStatsData;
}

export default function ServicesStats({ stats }: ServicesStatsProps) {
  return (
    <Box sx={{ 
      display: 'grid', 
      gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
      gap: 3 
    }}>
      <StatCard
        title="Total Layanan"
        value={stats.total}
        icon={List}
        iconColor="text-blue-600"
        iconBgColor="bg-blue-100"
      />
      <StatCard
        title="Layanan Aktif"
        value={stats.active}
        icon={CheckCircle}
        iconColor="text-green-600"
        iconBgColor="bg-green-100"
      />
      <StatCard
        title="Layanan Nonaktif"
        value={stats.inactive}
        icon={XCircle}
        iconColor="text-red-600"
        iconBgColor="bg-red-100"
      />
      <StatCard
        title="Layanan Populer"
        value={stats.popular}
        icon={Star}
        iconColor="text-yellow-600"
        iconBgColor="bg-yellow-100"
      />
    </Box>
  );
}

