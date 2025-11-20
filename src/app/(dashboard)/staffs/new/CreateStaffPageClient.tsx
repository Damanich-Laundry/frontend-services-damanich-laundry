"use client";

import React from "react";
import { Alert, Box, Typography, Button } from "@mui/material";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import StaffForm, { StaffFormData } from "@/components/modules/staff-page/StaffForm";
import { useCreateStaff } from "@/hooks";

const CreateStaffPageClient = () => {
  const router = useRouter();
  const { createStaff, loading, error } = useCreateStaff();

  const handleSubmit = async (data: StaffFormData) => {
    try {
      const payload = {
        username: data.username,
        email: data.email,
        password: data.password || '', 
        full_name: data.full_name,
        role: data.role.toLowerCase(),
        phone: data.phone,
      };

      await createStaff(payload);
      
      router.push("/staffs");
    } catch (err) {
      console.error("Failed to create staff:", err);
    }
  };

  const handleCancel = () => {
    router.push("/staffs");
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
            Tambah Staff Baru
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lengkapi informasi staff baru yang akan ditambahkan ke sistem
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
          Kembali
        </Button>
      </Box>

      {error && (
        <Alert severity="error" onClose={() => {}}>
          {error}
        </Alert>
      )}

      <StaffForm
        isEditMode={false}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={loading}
      />
    </Box>
  );
};

export default CreateStaffPageClient;