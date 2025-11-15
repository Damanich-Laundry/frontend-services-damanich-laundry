"use client";

import React, { useRef } from 'react';
import { Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import {
  OrderFormHeader,
  OrderForm,
  OrderFormFooter,
  OrderFormData,
  OrderFormRef
} from '@/components/modules/orders-page';
import { mockCustomers } from '@/datas/dummies';
import { mockServices } from '@/datas/dummies';

const CreateOrderPage = () => {
  const router = useRouter();
  const formRef = useRef<OrderFormRef>(null);

  const handleSubmit = (data: OrderFormData) => {
    console.log('Order data to submit:', data);
    // TODO: Implement API call to create order
    // After successful creation, navigate back to orders page
    router.push('/orders');
  };

  const handleCancel = () => {
    router.push('/orders');
  };

  const handleAddNewCustomer = () => {
    console.log('Navigate to add new customer');
    // TODO: Navigate to add customer page or open modal
    router.push('/customers?action=add');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Page Header */}
      <OrderFormHeader onBack={handleCancel} />

      {/* Order Form */}
      <OrderForm
        ref={formRef}
        customers={mockCustomers}
        services={mockServices}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        onAddNewCustomer={handleAddNewCustomer}
      />

      {/* Footer with Action Buttons */}
      <OrderFormFooter
        onCancel={handleCancel}
        onSave={() => {
          formRef.current?.submit();
        }}
      />
    </Box>
  );
};

export default CreateOrderPage;