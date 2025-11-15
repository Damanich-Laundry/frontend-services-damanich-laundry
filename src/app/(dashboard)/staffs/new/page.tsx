"use client";

import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import StaffForm from '@/components/modules/staff-page/StaffForm';

const CreateStaffPage = () => {
  const router = useRouter();

  const handleSubmit = (data: any) => {
    console.log('Staff data to submit:', data);
    router.push('/staffs');
  };

  const handleCancel = () => {
    router.push('/staffs');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Tambah Staff Baru
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
          Kembali ke Data Staff
        </Button>
      </Box>

      <StaffForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </Box>
  );
};

export default CreateStaffPage;

