"use client";

import React, { useState, useMemo } from "react";
import { Box, Typography, CircularProgress, Alert, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useStaffs, useDeleteStaff } from "@/hooks";
import StaffTable from "@/components/modules/staff-page/StaffTable";
import { StaffHeader, StaffStats } from "@/components/modules/staff-page";
import MyModal from "@/components/Modal/MyModal";
import { UserRecord } from "@/services/staffService";

const StaffsPageClient = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedStaffId, setSelectedStaffId] = useState<number | null>(null);
  const [selectedStaffName, setSelectedStaffName] = useState<string | null>(null);
  
  const { staffs, loading, error, refetch } = useStaffs();
  const { deleteStaff, loading: deleting, error: deleteError } = useDeleteStaff();

  const filteredStaff = useMemo(() => {
    if (!searchQuery.trim()) return staffs;
    
    const query = searchQuery.toLowerCase();
    return staffs.filter((staff: UserRecord) =>
      staff.full_name.toLowerCase().includes(query) ||
      staff.username.toLowerCase().includes(query) ||
      staff.email.toLowerCase().includes(query) ||
      staff.phone.toLowerCase().includes(query) ||
      staff.role.toLowerCase().includes(query)
    );
  }, [staffs, searchQuery]);

  const stats = useMemo(() => {
    const totalStaff = staffs.length;
    const staffActive = staffs.filter((s: UserRecord) => s.is_active).length;
    const staffInactive = staffs.filter((s: UserRecord) => !s.is_active).length;
    
    const staffByRole = staffs.reduce((acc: Record<string, number>, staff: UserRecord) => {
      const role = staff.role.toLowerCase();
      acc[role] = (acc[role] || 0) + 1;
      return acc;
    }, {});

    return {
      totalStaff,
      staffActive,
      staffInactive,
      staffOnDuty: staffActive,
      staffByRole,
    };
  }, [staffs]);

  const handleEdit = (staffId: string | number) => {
    router.push(`/staffs/edit/${staffId}`);
  };

  const handleView = (staffId: string | number) => {
    router.push(`/staffs/${staffId}`);
  };

  const handleDelete = (staffId: string | number) => {
    const staff = staffs.find((s: UserRecord) => s.id === Number(staffId));
    if (staff) {
      setSelectedStaffId(Number(staffId));
      setSelectedStaffName(staff.full_name);
      setDeleteModalOpen(true);
    }
  };

  const confirmDelete = async () => {
    if (!selectedStaffId) return;

    try {
      await deleteStaff(selectedStaffId);
      setDeleteModalOpen(false);
      setSelectedStaffId(null);
      setSelectedStaffName(null);
      await refetch();
    } catch (err) {
      console.error("Failed to delete staff:", err);
    }
  };

  const cancelDelete = () => {
    setDeleteModalOpen(false);
    setSelectedStaffId(null);
    setSelectedStaffName(null);
  };

  const handleAddStaff = () => {
    router.push("/staffs/new");
  };

  if (loading) {
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

  if (error) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Daftar Staff
        </Typography>
        <Alert 
          severity="error"
          action={
            <Button color="inherit" size="small" onClick={refetch}>
              Coba Lagi
            </Button>
          }
        >
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
          Daftar Staff
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Kelola data staff dan karyawan Anda
        </Typography>
      </Box>

      <StaffHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onAddStaff={handleAddStaff}
      />

      <StaffStats stats={stats} />

      {deleteError && (
        <Alert 
          severity="error" 
          onClose={() => {}}
          sx={{ mb: 2 }}
        >
          {deleteError}
        </Alert>
      )}

      {filteredStaff.length === 0 && !loading && (
        <Alert severity="info">
          {searchQuery 
            ? `Tidak ada staff yang ditemukan dengan kata kunci "${searchQuery}"`
            : "Belum ada data staff. Klik tombol 'Tambah Staff' untuk menambahkan staff baru."}
        </Alert>
      )}

      {filteredStaff.length > 0 && (
        <StaffTable
          staff={filteredStaff}
          onEdit={handleEdit}
          onView={handleView}
          onDelete={handleDelete}
        />
      )}

      <MyModal
        title="Konfirmasi Hapus Staff"
        isOpen={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        size="sm"
        onOpen={() => {}}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Alert severity="warning" sx={{ mb: 1 }}>
            Perhatian! Tindakan ini tidak dapat dibatalkan.
          </Alert>
          
          <Typography variant="body1">
            Apakah Anda yakin ingin menghapus staff:
          </Typography>
          
          <Box 
            sx={{ 
              p: 2, 
              backgroundColor: '#f9fafb', 
              borderRadius: 1,
              borderLeft: '4px solid #ef4444'
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              {selectedStaffName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ID: {selectedStaffId}
            </Typography>
          </Box>

          <Typography variant="body2" color="text.secondary">
            Data staff ini akan dihapus secara permanen dari sistem.
          </Typography>

          <Box 
            sx={{ 
              display: "flex", 
              gap: 2, 
              justifyContent: "flex-end", 
              mt: 2 
            }}
          >
            <Button
              variant="outlined"
              onClick={cancelDelete}
              disabled={deleting}
              sx={{
                borderColor: "#d1d5db",
                color: "#374151",
                "&:hover": {
                  borderColor: "#9ca3af",
                  backgroundColor: "#f9fafb",
                },
              }}
            >
              Batal
            </Button>
            <Button
              variant="contained"
              onClick={confirmDelete}
              disabled={deleting}
              sx={{
                backgroundColor: "#ef4444",
                "&:hover": {
                  backgroundColor: "#dc2626",
                },
                "&:disabled": {
                  backgroundColor: "#fca5a5",
                }
              }}
            >
              {deleting ? (
                <>
                  <CircularProgress size={16} sx={{ mr: 1, color: 'white' }} />
                  Menghapus...
                </>
              ) : (
                "Hapus Staff"
              )}
            </Button>
          </Box>
        </Box>
      </MyModal>
    </Box>
  );
};

export default StaffsPageClient;