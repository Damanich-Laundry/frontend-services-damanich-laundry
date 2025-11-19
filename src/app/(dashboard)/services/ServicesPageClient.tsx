"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Skeleton,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { isAxiosError } from "axios";
import {
  ServicesHeader,
  ServicesStats,
  ServicesTable,
  type Service,
} from "@/components/modules/services-page";
import {
  serviceService,
  type ServiceRecord,
} from "@/services/serviceService";

const formatCurrencyIDR = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);

const formatDuration = (hours: number) => {
  if (!Number.isFinite(hours)) {
    return "-";
  }

  const days = Math.floor(hours / 24);
  const remainingHours = hours % 24;

  const parts: string[] = [];
  if (days > 0) {
    parts.push(`${days} Hari`);
  }
  if (remainingHours > 0) {
    parts.push(`${remainingHours} Jam`);
  }

  return parts.length > 0 ? parts.join(" ") : `${hours} Jam`;
};

const transformServiceRecord = (record: ServiceRecord): Service => ({
  id: String(record.id),
  name: record.service_name,
  description: `${record.service_type} • per ${record.unit}`,
  estimatedTime: formatDuration(record.duration_hours),
  pricePerKg: `${formatCurrencyIDR(record.price_per_unit)} / ${record.unit}`,
  status: record.is_active ? "Aktif" : "Nonaktif",
  unit: record.unit,
  serviceType: record.service_type,
  durationHours: record.duration_hours,
  pricePerUnitRaw: record.price_per_unit,
  isActive: record.is_active,
  createdAt: record.createdAt,
  updatedAt: record.updatedAt,
});

const getErrorMessage = (error: unknown) => {
  if (isAxiosError(error)) {
    const apiMessage =
      (error.response?.data as { message?: string })?.message;
    if (apiMessage) {
      return apiMessage;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Gagal memuat layanan. Coba lagi.";
};

const STATS_SKELETON_KEYS = ["total", "active", "inactive", "popular"];
const TABLE_SKELETON_ROW_KEYS = ["row-0", "row-1", "row-2", "row-3", "row-4", "row-5"];

const StatsSkeleton = () => (
  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: {
        xs: "1fr",
        sm: "repeat(2, 1fr)",
        lg: "repeat(4, 1fr)",
      },
      gap: 3,
    }}
  >
    {STATS_SKELETON_KEYS.map((key) => (
      <Skeleton
        key={`stats-skeleton-${key}`}
        variant="rounded"
        height={130}
        sx={{ width: "100%" }}
      />
    ))}
  </Box>
);

const TableSkeleton = () => (
  <Card sx={{ boxShadow: 1 }}>
    <CardContent>
      {TABLE_SKELETON_ROW_KEYS.map((key, index) => (
        <Skeleton
          key={`table-skeleton-${key}`}
          variant="rounded"
          height={32}
          sx={{ mb: index === 5 ? 0 : 2 }}
        />
      ))}
    </CardContent>
  </Card>
);

const EmptyStateCard = ({ message }: { message: string }) => (
  <Card sx={{ boxShadow: 1 }}>
    <CardContent>
      <Typography variant="body2" color="text.secondary">
        {message}
      </Typography>
    </CardContent>
  </Card>
);

const ServicesPageClient = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchServices = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const records = await serviceService.getServices();
      const normalized = records.map(transformServiceRecord);
      setServices(normalized);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const filteredServices = useMemo(
    () =>
      services.filter((service) =>
        service.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [services, searchQuery]
  );

  const stats = useMemo(() => {
    const total = services.length;
    const active = services.filter((s) => s.status === "Aktif").length;
    const inactive = total - active;
    const popular = Math.min(active, 3); // TODO: Replace with real popularity metric when available

    return {
      total,
      active,
      inactive,
      popular,
    };
  }, [services]);

  const handleEdit = useCallback(
    (serviceId: string) => {
      router.push(`/services/edit/${serviceId}`);
    },
    [router]
  );

  const handleView = useCallback((serviceId: string) => {
    console.log("View service:", serviceId);
  }, []);

  const handleDelete = useCallback((serviceId: string) => {
    console.log("Delete service:", serviceId);
  }, []);

  const handleAddService = useCallback(() => {
    router.push("/services/new");
  }, [router]);

  const emptyStateMessage = searchQuery
    ? "Tidak ada layanan yang cocok dengan pencarian."
    : "Belum ada data layanan.";

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

      {isLoading ? <StatsSkeleton /> : <ServicesStats stats={stats} />}

      {error && (
        <Alert
          severity="error"
          action={
            <Button color="inherit" size="small" onClick={fetchServices}>
              Coba lagi
            </Button>
          }
        >
          {error}
        </Alert>
      )}

      {isLoading ? (
        <TableSkeleton />
      ) : filteredServices.length === 0 ? (
        <EmptyStateCard message={emptyStateMessage} />
      ) : (
        <ServicesTable
          services={filteredServices}
          onEdit={handleEdit}
          onView={handleView}
          onDelete={handleDelete}
        />
      )}
    </Box>
  );
};

export default ServicesPageClient;
