"use client";

import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import {
  ServicesHeader,
  ServicesStats,
  ServicesTable,
  type Service,
} from "@/components/modules/services-page";
import { mockServices } from "@/datas/dummies";

const ServicesPageClient = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const servicesData: Service[] = mockServices;

  const totalServices = servicesData.length;
  const activeServices = servicesData.filter((s) => s.status === "Aktif").length;
  const inactiveServices = servicesData.filter(
    (s) => s.status === "Nonaktif"
  ).length;
  const popularServices = 5;

  const filteredServices = servicesData.filter((service) =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    total: totalServices,
    active: activeServices,
    inactive: inactiveServices,
    popular: popularServices,
  };

  const handleEdit = (serviceId: string) => {
    router.push(`/services/edit/${serviceId}`);
  };

  const handleView = (serviceId: string) => {
    console.log("View service:", serviceId);
  };

  const handleDelete = (serviceId: string) => {
    console.log("Delete service:", serviceId);
  };

  const handleAddService = () => {
    router.push("/services/new");
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
        Kelola jenis layanan laundry yang tersedia
      </Typography>

      <ServicesHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onAddService={handleAddService}
      />

      <ServicesStats stats={stats} />

      <ServicesTable
        services={filteredServices}
        onEdit={handleEdit}
        onView={handleView}
        onDelete={handleDelete}
      />
    </Box>
  );
};

export default ServicesPageClient;

