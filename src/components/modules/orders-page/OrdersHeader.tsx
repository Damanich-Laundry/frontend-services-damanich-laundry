"use client";

import React from 'react';
import { Box, Button } from '@mui/material';
import { Plus } from 'lucide-react';
import { SearchInput } from '@/components/shared';

interface OrdersHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onAddOrder?: () => void;
}

export default function OrdersHeader({
  onSearchChange,
  onAddOrder
}: OrdersHeaderProps) {
  return (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      <Box sx={{ flex: 1 }}>
        <SearchInput 
          placeholder="Cari nomor pesanan, nama pelanggan..." 
          onSearch={onSearchChange}
        />
      </Box>
      <Button 
        variant="contained"
        startIcon={<Plus size={16} />}
        onClick={onAddOrder}
        sx={{ 
          whiteSpace: 'nowrap',
          backgroundColor: '#6b7280',
          '&:hover': {
            backgroundColor: '#4b5563',
          }
        }}
      >
        Tambah Pesanan Baru
      </Button>
    </Box>
  );
}

