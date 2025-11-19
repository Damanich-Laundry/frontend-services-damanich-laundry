"use client";

import React from "react";
import { Alert, Box, Typography, Button } from "@mui/material";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import ServiceForm from "@/components/modules/services-page/ServiceForm";
import { useCreateService } from "@/hooks";
import type { Service } from "@/components/modules/services-page/types";

const DEFAULT_UNIT = "kg";

const parsePriceToNumber = (value: string) => {
  const numeric = value.replace(/\D/g, "");
  return numeric ? Number(numeric) : 0;
};

const parseEstimatedTimeToHours = (estimatedTime: string) => {
  const [amountStr = "0", unit = "Jam"] = estimatedTime?.split(" ") ?? [];
  const amount = Number(amountStr);

  if (!Number.isFinite(amount) || amount <= 0) {
    return 0;
  }

  if (unit.toLowerCase().startsWith("hari")) {
    return amount * 24;
  }

  return amount;
};

const CreateServicePageClient = () => {
  const router = useRouter();
  const { createService, loading, error, resetError } = useCreateService();

  const handleSubmit = async (data: Omit<Service, "id"> & { isPopular?: boolean }) => {
    try {
      await createService({
        service_name: data.name,
        service_type: data.description,
        unit: DEFAULT_UNIT,
        price_per_unit: parsePriceToNumber(data.pricePerKg),
        duration_hours: parseEstimatedTimeToHours(data.estimatedTime),
      });
      router.push("/services");
    } catch {
      // Error already reflected via hook state
    }
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
            Lengkapi detail layanan agar dapat ditampilkan pada daftar layanan
          </Typography>
        </Box>
        <Button
          variant="outlined"
          startIcon={<ArrowLeft size={16} />}
          onClick={handleCancel}
          disabled={loading}
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

      {error && (
        <Alert severity="error" onClose={resetError}>
          {error}
        </Alert>
      )}

      <ServiceForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </Box>
  );
};

export default CreateServicePageClient;
