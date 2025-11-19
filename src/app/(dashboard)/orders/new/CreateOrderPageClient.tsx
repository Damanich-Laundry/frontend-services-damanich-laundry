"use client";

import React, { useRef } from "react";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import {
  OrderFormHeader,
  OrderForm,
  OrderFormFooter,
  OrderFormData,
  OrderFormRef,
} from "@/components/modules/orders-page";
import { mockCustomers, mockServices } from "@/datas/dummies";

const CreateOrderPageClient = () => {
  const router = useRouter();
  const formRef = useRef<OrderFormRef>(null);

  const handleSubmit = (data: OrderFormData) => {
    console.log("Order data to submit:", data);
    // TODO: Implement API call to create order
    router.push("/orders");
  };

  const handleCancel = () => {
    router.push("/orders");
  };

  const handleAddNewCustomer = () => {
    router.push("/customers?action=add");
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <OrderFormHeader onBack={handleCancel} />

      <OrderForm
        ref={formRef}
        customers={mockCustomers}
        services={mockServices}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        onAddNewCustomer={handleAddNewCustomer}
      />

      <OrderFormFooter
        onCancel={handleCancel}
        onSave={() => {
          formRef.current?.submit();
        }}
      />
    </Box>
  );
};

export default CreateOrderPageClient;

