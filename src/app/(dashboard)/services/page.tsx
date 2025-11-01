"use client";

import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import {
  ServicesHeader,
  ServicesStats,
  ServicesTable,
  Service
} from '@/components/modules/services-page';
import { mockServices } from '@/datas/dummies';

const ServicesPage = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const servicesData: Service[] = mockServices;

  const totalServices = servicesData.length;
  const activeServices = servicesData.filter(s => s.status === 'Aktif').length;
  const inactiveServices = servicesData.filter(s => s.status === 'Nonaktif').length;
  const popularServices = 5; // Mock data

  const filteredServices = servicesData.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    total: totalServices,
    active: activeServices,
    inactive: inactiveServices,
    popular: popularServices
  };

  const handleEdit = (serviceId: string) => {
    router.push(`/services/edit/${serviceId}`);
  };

  const handleView = (serviceId: string) => {
    console.log('View service:', serviceId);
    // TODO: Implement view functionality
  };

  const handleDelete = (serviceId: string) => {
    console.log('Delete service:', serviceId);
    // TODO: Implement delete functionality
  };

  const handleAddService = () => {
    router.push('/services/new');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Page Title */}
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
        Kelola jenis layanan laundry yang tersedia
      </Typography>

      {/* Header Section */}
      <ServicesHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onAddService={handleAddService}
      />

      {/* Stat Cards */}
      <ServicesStats stats={stats} />

      {/* Services Table */}
      <ServicesTable
        services={filteredServices}
        onEdit={handleEdit}
        onView={handleView}
        onDelete={handleDelete}
      />
    </Box>
  );
};

export default ServicesPage;
