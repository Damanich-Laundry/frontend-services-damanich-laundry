"use client";

import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import {
  ServicesHeader,
  ServicesStats,
  ServicesTable,
  Service
} from '@/components/modules/services-page';

const ServicesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const servicesData: Service[] = [
    {
      id: '1',
      name: 'Cuci Kering',
      description: 'Cuci dan keringkan pakaian standar',
      estimatedTime: '2 Hari',
      pricePerKg: 'Rp 8.000',
      status: 'Aktif'
    },
    {
      id: '2',
      name: 'Cuci Setrika',
      description: 'Cuci, kering, dan setrika rapi',
      estimatedTime: '3 Hari',
      pricePerKg: 'Rp 12.000',
      status: 'Aktif'
    },
    {
      id: '3',
      name: 'Express 1 Hari',
      description: 'Layanan cepat dalam 1 hari',
      estimatedTime: '1 Hari',
      pricePerKg: 'Rp 15.000',
      status: 'Aktif'
    },
    {
      id: '4',
      name: 'Dry Clean',
      description: 'Cuci kering untuk pakaian khusus',
      estimatedTime: '4 Hari',
      pricePerKg: 'Rp 25.000',
      status: 'Nonaktif'
    }
  ];

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
    console.log('Edit service:', serviceId);
    // TODO: Implement edit functionality
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
    console.log('Add new service');
    // TODO: Implement add functionality
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
