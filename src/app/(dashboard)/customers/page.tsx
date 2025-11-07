"use client";

import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { mockCustomers } from '@/datas/dummies';
import { Customer } from '@/components/modules/customer-page/types';
import CustomerTable from '@/components/modules/customer-page/CustomerTable';
import { CustomerHeader, CustomerStats } from '@/components/modules/customer-page';

const CustomerPage = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const CustomerData: Customer[] = mockCustomers;

  const totalCustomer = CustomerData.length;
  const newCustomer = 102// Mock data
  const totalOrder = 1234;// Mock data
  const activeCustomer = 5; // Mock data

  const filteredCustomer = CustomerData.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
 
  const stats = {
    totalCustomer: totalCustomer,
    newCustomer: newCustomer,
    totalOrder: totalOrder,
    activeCustomer: activeCustomer
  };

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

      {/* customers Table */}
      <CustomerTable
        customer={filteredCustomer}
        onEdit={handleEdit}
        onView={handleView}
        onDelete={handleDelete}
      />
    </Box>
  );
};

export default CustomerPage;
