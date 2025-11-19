"use client";

import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import ServiceForm from "@/components/modules/services-page/ServiceForm";

const CreateServicePageClient = () => {
  const router = useRouter();

  const handleSubmit = (data: any) => {
    console.log("Service data to submit:", data);
    router.push("/services");
  };

  const handleCancel = () => {
    router.push("/services");
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Tambah Layanan Baru
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Perbarui data layanan yang sudah ada
          </Typography>
        </Box>
        <Button
          variant="outlined"
          startIcon={<ArrowLeft size={16} />}
          onClick={handleCancel}
          sx={{
            borderColor: "#d1d5db",
            color: "#374151",
            "&:hover": {
              borderColor: "#9ca3af",
              backgroundColor: "#f9fafb",
            },
          }}
        >
          Kembali ke Data Layanan
        </Button>
      </Box>

      <ServiceForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </Box>
  );
};

export default CreateServicePageClient;

