"use client";

import React, { useMemo } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { ArrowLeft } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import CustomerForm, { type CustomerFormValues } from '@/components/modules/customer-page/CustomerForm';
import { mockCustomers } from '@/datas/dummies';
import { Customer } from '@/components/modules/customer-page/types';

const EditCustomerPage = () => {
  const router = useRouter();
  const params = useParams();
  const customerId = Array.isArray(params?.customerId) ? params.customerId[0] : (params?.customerId as string | undefined);

  const customer: Customer | undefined = useMemo(() => {
    if (!customerId) return undefined;
    return mockCustomers.find((c) => c.id === customerId);
  }, [customerId]);

  const handleSubmit = (data: CustomerFormValues) => {
    console.log('Updated customer data:', { id: customerId, ...data });
    router.push('/customers');
  };

  const handleCancel = () => {
    router.push('/customers');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Edit Data Pelanggan
          </Typography>
          {customer && (
            <Typography variant="body2" color="text.secondary">
              {customer.name} • {customer.phone}
            </Typography>
          )}
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

      <CustomerForm
        initialData={customer}
        isEditMode
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </Box>
  );
};

export default EditCustomerPage;


