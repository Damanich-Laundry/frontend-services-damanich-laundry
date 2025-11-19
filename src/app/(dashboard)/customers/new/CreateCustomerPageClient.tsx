"use client";

import React from "react";
import { Alert, Box, Typography, Button } from "@mui/material";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import CustomerForm, {
  type CustomerFormValues,
} from "@/components/modules/customer-page/CustomerForm";
import { useCreateCustomer } from "@/hooks";

const CreateCustomerPageClient = () => {
  const router = useRouter();
  const { createCustomer, loading, error } = useCreateCustomer();

  const handleSubmit = async (data: CustomerFormValues) => {
    try {
      await createCustomer({
        name: data.name,
        phone: data.phone,
        email: data.email,
        address: data.address,
      });
      router.push("/customers");
    } catch {
      // Error already handled inside the hook, remain on page
    }
  };

  const handleCancel = () => {
    router.push("/customers");
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* Page Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Tambah Pelanggan Baru
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Masukkan informasi detail pelanggan untuk kebutuhan transaksi
            laundry.
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
          Kembali ke Data Pelanggan
        </Button>
      </Box>

      {error && <Alert severity="error">{error}</Alert>}

      {/* Form Card */}
      <CustomerForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={loading}
      />
    </Box>
  );
};

export default CreateCustomerPageClient;

