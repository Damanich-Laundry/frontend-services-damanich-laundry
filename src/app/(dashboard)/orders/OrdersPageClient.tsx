"use client";

import React, { useState, useMemo } from "react";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import {
  OrdersHeader,
  OrdersFilters,
  OrdersStats,
  OrdersTable,
} from "@/components/modules/orders-page";
import { mockOrders, mockOrdersStats } from "@/datas/dummies";

type FilterStatus =
  | "Semua"
  | "Menunggu"
  | "Dalam Proses"
  | "Selesai"
  | "Dibatalkan";

const OrdersPageClient = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterStatus>("Semua");

  const filteredOrders = useMemo(() => {
    let filtered = mockOrders;

    if (activeFilter !== "Semua") {
      filtered = filtered.filter((order) => order.status === activeFilter);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (order) =>
          order.orderNumber.toLowerCase().includes(query) ||
          order.customerName.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [searchQuery, activeFilter]);

  const handleEdit = (orderId: string) => {
    router.push(`/orders/edit/${orderId}`);
  };

  const handleView = (orderId: string) => {
    console.log("View order:", orderId);
    // TODO: Implement view functionality
  };

  const handleDelete = (orderId: string) => {
    console.log("Delete order:", orderId);
    // TODO: Implement delete functionality
  };

  const handleAddOrder = () => {
    router.push("/orders/new");
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
        Daftar Pesanan
      </Typography>

      <OrdersHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onAddOrder={handleAddOrder}
      />

      <OrdersFilters
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      <OrdersStats stats={mockOrdersStats} />

      <OrdersTable
        orders={filteredOrders}
        onEdit={handleEdit}
        onView={handleView}
        onDelete={handleDelete}
      />
    </Box>
  );
};

export default OrdersPageClient;

