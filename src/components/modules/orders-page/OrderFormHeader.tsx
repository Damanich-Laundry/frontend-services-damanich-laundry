"use client";

import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { ArrowLeft } from 'lucide-react';

interface OrderFormHeaderProps {
  onBack?: () => void;
}

export default function OrderFormHeader({ onBack }: OrderFormHeaderProps) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Tambah Pesanan Baru
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Isi data pesanan dengan lengkap sebelum menyimpan.
        </Typography>
      </Box>
      <Button
        variant="outlined"
        startIcon={<ArrowLeft size={16} />}
        onClick={onBack}
        sx={{
          borderColor: '#d1d5db',
          color: '#374151',
          '&:hover': {
            borderColor: '#9ca3af',
            backgroundColor: '#f9fafb'
          }
        }}
      >
        Kembali ke Daftar Pesanan
      </Button>
    </Box>
  );
}

