"use client";

import React from 'react';
import { Box, Button } from '@mui/material';

type FilterStatus = 'Semua' | 'Menunggu' | 'Dalam Proses' | 'Selesai' | 'Dibatalkan';

interface OrdersFiltersProps {
  activeFilter: FilterStatus;
  onFilterChange: (filter: FilterStatus) => void;
}

const filters: FilterStatus[] = ['Semua', 'Menunggu', 'Dalam Proses', 'Selesai', 'Dibatalkan'];

export default function OrdersFilters({
  activeFilter,
  onFilterChange
}: OrdersFiltersProps) {
  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      {filters.map((filter) => (
        <Button
          key={filter}
          variant={activeFilter === filter ? 'contained' : 'outlined'}
          onClick={() => onFilterChange(filter)}
          sx={{
            minWidth: 'auto',
            px: 2,
            py: 1,
            textTransform: 'none',
            fontSize: '0.875rem',
            backgroundColor: activeFilter === filter ? '#6b7280' : 'transparent',
            color: activeFilter === filter ? '#fff' : '#6b7280',
            borderColor: '#d1d5db',
            '&:hover': {
              backgroundColor: activeFilter === filter ? '#4b5563' : '#f3f4f6',
              borderColor: '#9ca3af',
            },
          }}
        >
          {filter}
        </Button>
      ))}
    </Box>
  );
}

