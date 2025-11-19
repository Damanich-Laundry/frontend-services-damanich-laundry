"use client";

import React, { useMemo } from 'react';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Typography,
} from '@mui/material';
import { ArrowLeft } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import CustomerForm, {
  type CustomerFormValues,
} from '@/components/modules/customer-page/CustomerForm';
import { Customer } from '@/components/modules/customer-page/types';
import { useCustomerDetail, useUpdateCustomer } from '@/hooks';

const EditCustomerPage = () => {
  const router = useRouter();
  const params = useParams();
  const customerId = Array.isArray(params?.customerId)
    ? params.customerId[0]
    : (params?.customerId as string | undefined);

  const {
    customer,
    loading: detailLoading,
    error: detailError,
    refetch,
  } = useCustomerDetail(customerId);

  const {
    updateCustomer,
    loading: updateLoading,
    error: updateError,
    resetError,
  } = useUpdateCustomer();

  const mappedCustomer = useMemo<Partial<Customer> | undefined>(() => {
    if (!customer) return undefined;

    return {
      id: customer.id.toString(),
      name: customer.name,
      phone: customer.phone ?? '',
      email: customer.email ?? '',
      address: customer.address ?? '',
      totalTransaction: customer.total_orders?.toString() ?? '0',
      registeredDate: customer.member_since ?? '',
    };
  }, [customer]);

  const handleSubmit = async (data: CustomerFormValues) => {
    if (!customerId) {
      return;
    }

    try {
      await updateCustomer(customerId, {
        name: data.name,
        phone: data.phone,
        email: data.email,
        address: data.address,
      });
      router.push('/customers');
    } catch {
      // Error already surfaced via `updateError`
    }
  };

  const handleCancel = () => {
    router.push('/customers');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Edit Data Pelanggan
          </Typography>
          {mappedCustomer && (
            <Typography variant="body2" color="text.secondary">
              {mappedCustomer.name} • {mappedCustomer.phone}
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
              backgroundColor: '#f9fafb',
            },
          }}
        >
          Kembali ke Data Pelanggan
        </Button>
      </Box>

      {!customerId && (
        <Alert severity="warning">ID pelanggan tidak ditemukan.</Alert>
      )}

      {detailError && (
        <Alert
          severity="error"
          action={
            <Button color="inherit" size="small" onClick={() => void refetch()}>
              Coba Lagi
            </Button>
          }
        >
          {detailError}
        </Alert>
      )}

      {updateError && (
        <Alert severity="error" onClose={resetError}>
          {updateError}
        </Alert>
      )}

      {detailLoading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 320,
          }}
        >
          <CircularProgress />
        </Box>
      ) : mappedCustomer ? (
        <CustomerForm
          initialData={mappedCustomer}
          isEditMode
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          loading={updateLoading}
        />
      ) : (
        customerId && (
          <Alert severity="info">
            Data pelanggan tidak ditemukan atau sudah dihapus.
          </Alert>
        )
      )}
    </Box>
  );
};

export default EditCustomerPage;



