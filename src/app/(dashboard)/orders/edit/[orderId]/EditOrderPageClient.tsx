"use client";

import React, { useRef, useState, useEffect } from "react";
import { Box } from "@mui/material";
import { useRouter, useParams } from "next/navigation";
import {
  EditOrderFormHeader,
  EditOrderForm,
  PaymentDetailsCard,
  OrderSummaryCard,
  EditOrderFormData,
  EditOrderFormRef,
} from "@/components/modules/orders-page";
import { mockCustomers, mockServices, mockOrders } from "@/datas/dummies";
import type { Order } from "@/datas/dummies";
import { parseDate } from "@/utils/date";

const EditOrderPageClient = () => {
  const router = useRouter();
  const params = useParams();
  const orderId = params?.orderId as string;
  const formRef = useRef<EditOrderFormRef>(null);

  const [orderData, setOrderData] = useState<Order | null>(null);
  const [paymentData, setPaymentData] = useState({
    paymentMethod: "tunai",
    paymentStatus: "Belum Dibayar",
    paymentDate: "2025-01-15",
    transactionRef: "",
  });

  useEffect(() => {
    const order = mockOrders.find((o) => o.id === orderId);
    if (order) {
      setOrderData(order);
    }
  }, [orderId]);

  const handleSubmit = (data: EditOrderFormData) => {
    console.log("Order data to update:", { ...data, id: orderId, ...paymentData });
    router.push("/orders");
  };

  const handleCancel = () => {
    router.push("/orders");
  };

  const handleUpdatePayment = () => {
    console.log("Payment data to update:", paymentData);
  };

  if (!orderData) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "400px",
        }}
      >
        <Box>Loading...</Box>
      </Box>
    );
  }

  const customer = mockCustomers.find((c) => c.name === orderData.customerName);
  const service = mockServices.find((s) => s.name === orderData.serviceType);

  let weight = "3.5";
  if (service && orderData.totalPrice) {
    const priceMatch = service.pricePerKg.match(/\d+/g);
    if (priceMatch) {
      const pricePerKg = parseInt(priceMatch.join(""));
      const totalPriceValue = parseInt(
        orderData.totalPrice.replace(/[Rp\s\.]/g, "")
      );
      if (pricePerKg > 0) {
        weight = (totalPriceValue / pricePerKg).toFixed(1);
      }
    }
  }

  const orderDateFormatted = parseDate(orderData.orderDate);
  const orderDateObj = new Date(orderDateFormatted);
  const estimatedCompletion = new Date(orderDateObj);
  estimatedCompletion.setDate(estimatedCompletion.getDate() + 2);

  const initialFormData: Partial<EditOrderFormData> = {
    orderNumber: orderData.orderNumber,
    customerId: customer?.id || "",
    serviceId: service?.id || "",
    weight: weight.toString(),
    status: orderData.status,
    orderDate: orderDateFormatted,
    estimatedCompletion: estimatedCompletion.toISOString().split("T")[0],
    notes: "",
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <EditOrderFormHeader onBack={handleCancel} />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "2fr 1fr" },
          gap: 3,
        }}
      >
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

        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <PaymentDetailsCard
            paymentMethod={paymentData.paymentMethod}
            paymentStatus={paymentData.paymentStatus}
            totalPrice={orderData.totalPrice}
            paymentDate={paymentData.paymentDate}
            transactionRef={paymentData.transactionRef}
            onPaymentMethodChange={(method) =>
              setPaymentData((prev) => ({ ...prev, paymentMethod: method }))
            }
            onPaymentStatusChange={(status) =>
              setPaymentData((prev) => ({ ...prev, paymentStatus: status }))
            }
            onPaymentDateChange={(date) =>
              setPaymentData((prev) => ({ ...prev, paymentDate: date }))
            }
            onTransactionRefChange={(ref) =>
              setPaymentData((prev) => ({ ...prev, transactionRef: ref }))
            }
            onUpdatePayment={handleUpdatePayment}
          />

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

export default EditOrderPageClient;

