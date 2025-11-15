"use client";

import React, { useRef, useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { useRouter, useParams } from 'next/navigation';
import {
  EditOrderFormHeader,
  EditOrderForm,
  PaymentDetailsCard,
  OrderSummaryCard,
  EditOrderFormData,
  EditOrderFormRef
} from '@/components/modules/orders-page';
import { mockCustomers, mockServices } from '@/datas/dummies';
import { mockOrders } from '@/datas/dummies';
import { Order } from '@/datas/dummies';
import { parseDate } from '@/utils/date';

const EditOrderPage = () => {
  const router = useRouter();
  const params = useParams();
  const orderId = params?.orderId as string;
  const formRef = useRef<EditOrderFormRef>(null);

  // Mock order data - in production, fetch from API
  const [orderData, setOrderData] = useState<Order | null>(null);
  const [paymentData, setPaymentData] = useState({
    paymentMethod: 'tunai',
    paymentStatus: 'Belum Dibayar',
    paymentDate: '2025-01-15',
    transactionRef: ''
  });

  useEffect(() => {
    // Mock data - replace with actual API call
    const order = mockOrders.find(o => o.id === orderId);
    if (order) {
      setOrderData(order);
    }
  }, [orderId]);

  const handleSubmit = (data: EditOrderFormData) => {
    console.log('Order data to update:', { ...data, id: orderId, ...paymentData });
    // TODO: Implement API call to update order
    // After successful update, navigate back to orders page
    router.push('/orders');
  };

  const handleCancel = () => {
    router.push('/orders');
  };

  const handleUpdatePayment = () => {
    console.log('Payment data to update:', paymentData);
    // TODO: Implement API call to update payment
    // Show success message
  };

  if (!orderData) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <Box>Loading...</Box>
      </Box>
    );
  }

  // Find customer and service IDs
  const customer = mockCustomers.find(c => c.name === orderData.customerName);
  const service = mockServices.find(s => s.name === orderData.serviceType);

  // Calculate weight from total price and service price per kg
  let weight = '3.5'; // Default weight
  if (service && orderData.totalPrice) {
    const priceMatch = service.pricePerKg.match(/\d+/g);
    if (priceMatch) {
      const pricePerKg = parseInt(priceMatch.join(''));
      const totalPriceValue = parseInt(orderData.totalPrice.replace(/[Rp\s\.]/g, ''));
      if (pricePerKg > 0) {
        weight = (totalPriceValue / pricePerKg).toFixed(1);
      }
    }
  }

  // Parse order date - format is "15 Jan 2025" or similar
  const orderDateFormatted = parseDate(orderData.orderDate);
  const orderDateObj = new Date(orderDateFormatted);
  
  // Calculate estimated completion date (2 days after order date)
  const estimatedCompletion = new Date(orderDateObj);
  estimatedCompletion.setDate(estimatedCompletion.getDate() + 2);

  const initialFormData: Partial<EditOrderFormData> = {
    orderNumber: orderData.orderNumber,
    customerId: customer?.id || '',
    serviceId: service?.id || '',
    weight: weight.toString(),
    status: orderData.status,
    orderDate: orderDateFormatted,
    estimatedCompletion: estimatedCompletion.toISOString().split('T')[0],
    notes: '' // Add notes field to Order interface if needed
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Page Header */}
      <EditOrderFormHeader onBack={handleCancel} />

      {/* Main Content - Two Column Layout */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' },
        gap: 3 
      }}>
        {/* Left Column - Edit Form */}
        <Box>
          <EditOrderForm
            ref={formRef}
            customers={mockCustomers}
            services={mockServices}
            initialData={initialFormData}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </Box>

        {/* Right Column - Sidebar */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Payment Details Card */}
          <PaymentDetailsCard
            paymentMethod={paymentData.paymentMethod}
            paymentStatus={paymentData.paymentStatus}
            totalPrice={orderData.totalPrice}
            paymentDate={paymentData.paymentDate}
            transactionRef={paymentData.transactionRef}
            onPaymentMethodChange={(method) => setPaymentData(prev => ({ ...prev, paymentMethod: method }))}
            onPaymentStatusChange={(status) => setPaymentData(prev => ({ ...prev, paymentStatus: status }))}
            onPaymentDateChange={(date) => setPaymentData(prev => ({ ...prev, paymentDate: date }))}
            onTransactionRefChange={(ref) => setPaymentData(prev => ({ ...prev, transactionRef: ref }))}
            onUpdatePayment={handleUpdatePayment}
          />

          {/* Order Summary Card */}
          <OrderSummaryCard
            customerName={orderData.customerName}
            itemQuantity={`${weight} kg`}
            totalBill={orderData.totalPrice}
            paymentStatus={paymentData.paymentStatus}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default EditOrderPage;
