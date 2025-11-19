"use client";

import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { mockStaffs } from "@/datas/dummies";
import type { Staff } from "@/components/modules/staff-page/types";
import StaffTable from "@/components/modules/staff-page/StaffTable";
import { StaffHeader, StaffStats } from "@/components/modules/staff-page";

const StaffsPageClient = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const staffData: Staff[] = mockStaffs;

  const totalStaff = staffData.length;
  const staffActive = staffData.filter((s) => s.status === "Aktif").length;
  const staffInactive = staffData.filter((s) => s.status === "Non-Aktif").length;
  const staffOnDuty = staffActive;

  const filteredStaff = staffData.filter((staff) =>
    staff.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    totalStaff,
    staffActive,
    staffInactive,
    staffOnDuty,
  };

  const handleEdit = (staffId: string) => {
    router.push(`/staffs/edit/${staffId}`);
  };

  const handleView = (staffId: string) => {
    console.log("View staff:", staffId);
  };

  const handleDelete = (staffId: string) => {
    console.log("Delete staff:", staffId);
  };

  const handleAddStaff = () => {
    router.push("/staffs/new");
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
        Daftar Staff
      </Typography>

      <StaffHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onAddStaff={handleAddStaff}
      />

      <StaffStats stats={stats} />

      <StaffTable
        staff={filteredStaff}
        onEdit={handleEdit}
        onView={handleView}
        onDelete={handleDelete}
      />
    </Box>
  );
};

export default StaffsPageClient;

