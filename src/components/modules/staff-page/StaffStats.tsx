"use client";

import React from 'react';
import { Box } from '@mui/material';
import { Users, UserCheck, UserX, Clock } from 'lucide-react';
import { StatCard } from '@/components/shared';
import { StaffStatsData } from './types';

interface StaffStatsProps {
  stats: StaffStatsData;
}

export default function StaffStats({ stats }: StaffStatsProps) {
  return (
    <Box sx={{ 
      display: 'grid', 
      gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
      gap: 3 
    }}>
      <StatCard
        title="Total Staff"
        value={stats.totalStaff}
        icon={Users}
        iconColor="text-blue-600"
        iconBgColor="bg-blue-100"
      />
      <StatCard
        title="Staff Aktif"
        value={stats.staffActive}
        icon={UserCheck}
        iconColor="text-green-600"
        iconBgColor="bg-green-100"
      />
      <StatCard
        title="Staff Non-Aktif"
        value={stats.staffInactive}
        icon={UserX}
        iconColor="text-red-600"
        iconBgColor="bg-red-100"
      />
      <StatCard
        title="Staff Bertugas"
        value={stats.staffOnDuty}
        icon={Clock}
        iconColor="text-yellow-600"
        iconBgColor="bg-yellow-100"
      />
    </Box>
  );
}

