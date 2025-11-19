"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import { ArrowLeft } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import ServiceForm from "@/components/modules/services-page/ServiceForm";
import ServicePreview from "@/components/modules/services-page/ServicePreview";
import ServiceInfoCard from "@/components/modules/services-page/ServiceInfoCard";
import type { Service } from "@/components/modules/services-page/types";
import { useServiceDetail, useUpdateService } from "@/hooks";
import type { ServiceRecord } from "@/services/serviceService";

const formatPriceDisplay = (value: number) =>
  `Rp ${value.toLocaleString("id-ID")}`;

const mapServiceRecordToService = (record: ServiceRecord): Service => ({
  id: String(record.id),
  name: record.service_name,
  description: record.service_type,
  estimatedTime: `${record.duration_hours} Jam`,
  pricePerKg: formatPriceDisplay(record.price_per_unit),
  status: record.is_active ? "Aktif" : "Nonaktif",
  unit: record.unit,
  serviceType: record.service_type,
  durationHours: record.duration_hours,
  pricePerUnitRaw: record.price_per_unit,
  isActive: record.is_active,
});

const parsePriceToNumber = (value: string) => {
  const numeric = value.replace(/\D/g, "");
  return numeric ? Number(numeric) : 0;
};

const parseEstimatedTimeToHours = (
  estimatedTime: string,
  fallback?: number
) => {
  const [amountStr = "0", unit = "Jam"] = estimatedTime?.split(" ") ?? [];
  const amount = Number(amountStr);

  if (!Number.isFinite(amount) || amount <= 0) {
    return fallback ?? 0;
  }

  if (unit.toLowerCase().startsWith("hari")) {
    return amount * 24;
  }

  return amount;
};

const EditServicePageClient = () => {
  const router = useRouter();
  const params = useParams();
  const serviceId = Array.isArray(params?.serviceId)
    ? params.serviceId[0]
    : (params?.serviceId as string | undefined);

  const {
    service,
    loading: detailLoading,
    error: detailError,
    refetch,
  } = useServiceDetail(serviceId);

  const { updateService, error: updateError, resetError } = useUpdateService();

  const mappedService = useMemo<Partial<Service> | undefined>(() => {
    if (!service) return undefined;
    return {
      ...mapServiceRecordToService(service),
      isPopular: false,
    };
  }, [service]);

  const [previewData, setPreviewData] = useState<
    Partial<Service> & { isPopular?: boolean }
  >({});

  useEffect(() => {
    if (mappedService) {
      setPreviewData(mappedService);
    }
  }, [mappedService]);

  const handleSubmit = async (
    data: Omit<Service, "id"> & { isPopular?: boolean }
  ) => {
    if (!serviceId || !service) {
      return;
    }

    try {
      await updateService(serviceId, {
        service_name: data.name,
        service_type: data.description,
        unit: service.unit ?? "kg",
        price_per_unit: parsePriceToNumber(data.pricePerKg),
        duration_hours: parseEstimatedTimeToHours(
          data.estimatedTime,
          service.duration_hours
        ),
      });
      router.push("/services");
    } catch {
      // error already handled via hook state
    }
  };

  const handleCancel = () => {
    router.push("/services");
  };

  const handleFormChange = (
    data: Partial<Service> & { isPopular?: boolean }
  ) => {
    setPreviewData(data);
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
            Edit Data Layanan
          </Typography>
          {mappedService && (
            <Typography variant="body2" color="text.secondary">
              {mappedService.name} • {mappedService.description}
            </Typography>
          )}
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

      {!serviceId && (
        <Alert severity="warning">ID layanan tidak ditemukan.</Alert>
      )}

      {detailError && (
        <Alert
          severity="error"
          action={
            <Button color="inherit" size="small" onClick={() => void refetch()}>
              Coba Lagi
            </Button>
          }
        >
          {detailError}
        </Alert>
      )}

      {updateError && (
        <Alert severity="error" onClose={resetError}>
          {updateError}
        </Alert>
      )}

      {detailLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "320px",
          }}
        >
          <CircularProgress size={36} />
        </Box>
      ) : mappedService ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "2fr 1fr" },
            gap: 3,
          }}
        >
          <Box>
            <ServiceForm
              initialData={mappedService}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              isEditMode
              onFormChange={handleFormChange}
            />
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <ServicePreview service={previewData} />
            <ServiceInfoCard />
          </Box>
        </Box>
      ) : (
        serviceId && (
          <Alert severity="info">
            Data layanan tidak ditemukan atau sudah dihapus.
          </Alert>
        )
      )}
    </Box>
  );
};

export default EditServicePageClient;

