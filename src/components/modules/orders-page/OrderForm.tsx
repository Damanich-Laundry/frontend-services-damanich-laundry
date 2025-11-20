"use client";

import React, { useState, useMemo, useImperativeHandle, forwardRef } from 'react';
import { Box } from '@mui/material';
import CustomerInformationForm from './CustomerInformationForm';
import OrderDetailsForm from './OrderDetailsForm';
import PaymentForm from './PaymentForm';
import { Customer } from '@/datas/dummies';
import { Service } from '@/components/modules/services-page/types';

export interface OrderFormData {
  customerId: string;
  serviceId: string;
  weight: string;
  orderDate: string;
  status: string;
  notes: string;
  totalPrice: string;
  paymentMethod: string;
  paymentStatus: string;
  autoPrint: boolean;
}

interface OrderFormProps {
  customers?: Customer[];
  services?: Service[];
  initialData?: Partial<OrderFormData>;
  onSubmit?: (data: OrderFormData) => void;
  onCancel?: () => void;
  onAddNewCustomer?: () => void;
}

export interface OrderFormRef {
  submit: () => void;
}

const OrderForm = forwardRef<OrderFormRef, OrderFormProps>(({
  customers = [],
  services = [],
  initialData,
  onSubmit,
  onAddNewCustomer
}, ref) => {
  const [formData, setFormData] = useState<OrderFormData>({
    customerId: initialData?.customerId || '',
    serviceId: initialData?.serviceId || '',
    weight: initialData?.weight || '0',
    orderDate: initialData?.orderDate || new Date().toISOString().split('T')[0],
    status: initialData?.status || 'Menunggu',
    notes: initialData?.notes || '',
    totalPrice: initialData?.totalPrice || 'Rp 0',
    paymentMethod: initialData?.paymentMethod || '',
    paymentStatus: initialData?.paymentStatus || 'Belum Dibayar',
    autoPrint: initialData?.autoPrint || false
  });

  const selectedService = useMemo(() => 
    services.find(s => s.id === formData.serviceId),
    [services, formData.serviceId]
  );

  // Calculate total price when service or weight changes
  React.useEffect(() => {
    if (selectedService && formData.weight && parseFloat(formData.weight) > 0) {
      const priceMatch = selectedService.pricePerKg.match(/\d+/g);
      if (priceMatch) {
        const pricePerKg = parseInt(priceMatch.join(''));
        const weight = parseFloat(formData.weight);
        const total = pricePerKg * weight;
        setFormData(prev => ({
          ...prev,
          totalPrice: `Rp ${total.toLocaleString('id-ID')}`
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        totalPrice: 'Rp 0'
      }));
    }
  }, [selectedService, formData.weight]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    onSubmit?.(formData);
  };

  useImperativeHandle(ref, () => ({
    submit: () => {
      onSubmit?.(formData);
    }
  }));

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Form Sections in Grid */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, 1fr)' },
        gap: 3 
      }}>
        {/* Customer Information */}
        <CustomerInformationForm
          customers={customers}
          selectedCustomerId={formData.customerId}
          onCustomerChange={(customerId) => setFormData(prev => ({ ...prev, customerId }))}
          onAddNewCustomer={onAddNewCustomer}
        />

        {/* Order Details */}
        <OrderDetailsForm
          services={services}
          selectedServiceId={formData.serviceId}
          weight={formData.weight}
          orderDate={formData.orderDate}
          status={formData.status}
          notes={formData.notes}
          onServiceChange={(serviceId) => setFormData(prev => ({ ...prev, serviceId }))}
          onWeightChange={(weight) => setFormData(prev => ({ ...prev, weight }))}
          onOrderDateChange={(orderDate) => setFormData(prev => ({ ...prev, orderDate }))}
          onStatusChange={(status) => setFormData(prev => ({ ...prev, status }))}
          onNotesChange={(notes) => setFormData(prev => ({ ...prev, notes }))}
        />
      </Box>

      {/* Payment Section */}
      <Box sx={{ maxWidth: { xs: '100%', lg: '50%' } }}>
        <PaymentForm
          totalPrice={formData.totalPrice}
          paymentMethod={formData.paymentMethod}
          paymentStatus={formData.paymentStatus}
          autoPrint={formData.autoPrint}
          onTotalPriceChange={(totalPrice) => setFormData(prev => ({ ...prev, totalPrice }))}
          onPaymentMethodChange={(paymentMethod) => setFormData(prev => ({ ...prev, paymentMethod }))}
          onPaymentStatusChange={(paymentStatus) => setFormData(prev => ({ ...prev, paymentStatus }))}
          onAutoPrintChange={(autoPrint) => setFormData(prev => ({ ...prev, autoPrint }))}
        />
      </Box>
    </Box>
  );
});

OrderForm.displayName = 'OrderForm';

export default OrderForm;
export { CustomerInformationForm, OrderDetailsForm, PaymentForm };

