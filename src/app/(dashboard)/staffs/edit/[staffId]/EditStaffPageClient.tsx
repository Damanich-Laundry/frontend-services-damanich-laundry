"use client";

import React from "react";
import { Alert, Box, Typography, Button, CircularProgress, Chip } from "@mui/material";
import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import StaffForm, { StaffFormData } from "@/components/modules/staff-page/StaffForm";
import { useStaffDetail, useUpdateStaff } from "@/hooks";

const EditStaffPageClient = () => {
  const router = useRouter();
  const params = useParams();
  const staffId = Array.isArray(params?.staffId)
    ? params.staffId[0]
    : (params?.staffId as string | undefined);

  const { 
    staff: userRecord, 
    loading: loadingStaff, 
    error: errorStaff 
  } = useStaffDetail(staffId ? Number(staffId) : undefined);
  
  const { 
    updateStaff, 
    loading: updating, 
    error: updateError 
  } = useUpdateStaff();

  const handleSubmit = async (data: StaffFormData) => {
    if (!staffId) return;

    try {
      const payload: any = {
        username: data.username,
        email: data.email,
        full_name: data.full_name,
        role: data.role.toLowerCase(),
        phone: data.phone,
        is_active: data.is_active,
      };

      if (data.password && data.password.trim() !== '') {
        payload.password = data.password;
      }

      await updateStaff(Number(staffId), payload);
      
      router.push("/staffs");
    } catch (err) {
      console.error("Failed to update staff:", err);
    }
  };

  const handleCancel = () => {
    router.push("/staffs");
  };

  if (loadingStaff) {
    return (
      <Box 
        sx={{ 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center", 
          minHeight: "60vh" 
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress size={48} />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Memuat data staff...
          </Typography>
        </Box>
      </Box>
    );
  }

  if (errorStaff || !userRecord) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
            Edit Data Staff
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Perbarui informasi staff
          </Typography>
        </Box>
        
        <Alert 
          severity="error"
          action={
            <Button 
              color="inherit" 
              size="small" 
              onClick={() => router.push("/staffs")}
            >
              Kembali
            </Button>
          }
        >
          {errorStaff || "Staff tidak ditemukan"}
        </Alert>
      </Box>
    );
  }

  const getRoleColor = (role: string) => {
    const colors: Record<string, string> = {
      admin: '#ef4444',
      staff: '#6366f1',
      kasir: '#10b981',
      operator: '#f59e0b',
      kurir: '#06b6d4'
    };
    return colors[role.toLowerCase()] || '#6b7280';
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
            Edit Data Staff
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            <Typography variant="body2" color="text.secondary">
              {userRecord.full_name}
            </Typography>
            <Typography variant="body2" color="text.secondary">•</Typography>
            <Typography variant="body2" color="text.secondary">
              @{userRecord.username}
            </Typography>
            <Typography variant="body2" color="text.secondary">•</Typography>
            <Chip
              label={userRecord.role.toUpperCase()}
              size="small"
              sx={{
                backgroundColor: `${getRoleColor(userRecord.role)}15`,
                color: getRoleColor(userRecord.role),
                fontWeight: 600,
                fontSize: '0.7rem',
                height: '20px',
              }}
            />
          </Box>
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

      {updateError && (
        <Alert severity="error" onClose={() => {}}>
          {updateError}
        </Alert>
      )}
      <StaffForm
        initialData={userRecord}
        isEditMode
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={updating}
      />
    </Box>
  );
};

export default EditStaffPageClient;