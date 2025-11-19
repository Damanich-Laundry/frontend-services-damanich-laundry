"use client";

import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import CustomerForm from '@/components/modules/customer-page/CustomerForm';

const CreateCustomerPage = () => {
  const router = useRouter();

  const handleSubmit = (data: any) => {
    console.log('Customer data to submit:', data);
    router.push('/customers');
  };

  const handleCancel = () => {
    router.push('/customers');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Page Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Tambah Pelanggan Baru
          </Typography>
        </Box>
        <Button
          variant="outlined"
          startIcon={<ArrowLeft size={16} />}
          onClick={handleCancel}
          sx={{
            borderColor: '#d1d5db',
            color: '#374151',
            '&:hover': {
              borderColor: '#9ca3af',
              backgroundColor: '#f9fafb'
            }
          }}
        >
          Kembali ke Data Pelanggan
        </Button>
      </Box>

      {/* Form Card */}
      <CustomerForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </Box>
  );
};

export default CreateCustomerPage;
