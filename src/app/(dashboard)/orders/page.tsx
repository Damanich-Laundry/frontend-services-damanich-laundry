"use client";

import React, { useState, useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import {
  OrdersHeader,
  OrdersFilters,
  OrdersStats,
  OrdersTable
} from '@/components/modules/orders-page';
import { mockOrders, mockOrdersStats } from '@/datas/dummies';

type FilterStatus = 'Semua' | 'Menunggu' | 'Dalam Proses' | 'Selesai' | 'Dibatalkan';

const OrdersPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterStatus>('Semua');

  const filteredOrders = useMemo(() => {
    let filtered = mockOrders;

    // Filter by status
    if (activeFilter !== 'Semua') {
      filtered = filtered.filter(order => order.status === activeFilter);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(order =>
        order.orderNumber.toLowerCase().includes(query) ||
        order.customerName.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [searchQuery, activeFilter]);

  const handleEdit = (orderId: string) => {
    console.log('Edit order:', orderId);
    // TODO: Implement edit functionality
  };

  const handleView = (orderId: string) => {
    console.log('View order:', orderId);
    // TODO: Implement view functionality
  };

  const handleDelete = (orderId: string) => {
    console.log('Delete order:', orderId);
    // TODO: Implement delete functionality
  };

  const handleAddOrder = () => {
    console.log('Add new order');
    // TODO: Navigate to add order page
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Page Title */}
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
        Daftar Pesanan
      </Typography>

      {/* Header Section with Search and Add Button */}
      <OrdersHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onAddOrder={handleAddOrder}
      />

      {/* Filter Tabs */}
      <OrdersFilters
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      {/* Stat Cards */}
      <OrdersStats stats={mockOrdersStats} />

      {/* Orders Table */}
      <OrdersTable
        orders={filteredOrders}
        onEdit={handleEdit}
        onView={handleView}
        onDelete={handleDelete}
      />
    </Box>
  );
};

export default OrdersPage;