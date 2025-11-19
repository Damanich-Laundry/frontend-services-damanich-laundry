"use client";

import React, { useMemo, useState } from 'react';
import { Alert, Box, CircularProgress, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useCustomers } from '@/hooks';
import type { Customer, CustomerStatsData } from '@/components/modules/customer-page/types';
import CustomerTable from '@/components/modules/customer-page/CustomerTable';
import { CustomerHeader, CustomerStats } from '@/components/modules/customer-page';

const CustomerPage = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const { customers: customerData, loading, error } = useCustomers();

  const formattedCustomers = useMemo<Customer[]>(() => {
    const dateFormatter = new Intl.DateTimeFormat('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    return customerData.map((customer) => ({
      id: customer.id.toString(),
      name: customer.name,
      phone: customer.phone ?? '-',
      address: customer.address ?? '-',
      totalTransaction: `${customer.total_orders} pesanan`,
      registeredDate: customer.member_since
        ? dateFormatter.format(new Date(customer.member_since))
        : 'Belum terdaftar',
    }));
  }, [customerData]);

  const stats = useMemo<CustomerStatsData>(() => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const totalCustomer = customerData.length;
    const newCustomer = customerData.filter((customer) => {
      if (!customer.member_since) return false;
      return new Date(customer.member_since) >= startOfMonth;
    }).length;
    const totalOrder = customerData.reduce(
      (sum, customer) => sum + (customer.total_orders ?? 0),
      0
    );
    const activeCustomer = customerData.filter(
      (customer) => (customer.total_orders ?? 0) > 0
    ).length;

    return {
      totalCustomer,
      newCustomer,
      totalOrder,
      activeCustomer,
    };
  }, [customerData]);

  const filteredCustomer = useMemo(
    () =>
      formattedCustomers.filter((customer) =>
        customer.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [formattedCustomers, searchQuery]
  );

  const handleEdit = (customerId: string) => {
    router.push(`/customers/edit/${customerId}`);
  };

  const handleView = (customerId: string) => {
    console.log('View customer:', customerId);
    // TODO: Implement view functionality
  };

  const handleDelete = (customerId: string) => {
    console.log('Delete customer:', customerId);
    // TODO: Implement delete functionality
  };

  const handleAddCustomer = () => {
    router.push('/customers/new');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Page Title */}
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
       Daftar Pelanggan
      </Typography>

      {/* Header Section */}
      <CustomerHeader

        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onAddCustomer={handleAddCustomer}
      />

      {/* Stat Cards */}
      <CustomerStats stats={stats} />

      {error && (
        <Alert severity="error">
          {error}
        </Alert>
      )}

      {/* customers Table */}
      {loading ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            justifyContent: 'center',
            py: 6,
          }}
        >
          <CircularProgress size={28} />
          <Typography variant="body2" color="text.secondary">
            Memuat data pelanggan...
          </Typography>
        </Box>
      ) : (
        <CustomerTable
          customer={filteredCustomer}
          onEdit={handleEdit}
          onView={handleView}
          onDelete={handleDelete}
        />
      )}
    </Box>
  );
};

export default CustomerPage;
