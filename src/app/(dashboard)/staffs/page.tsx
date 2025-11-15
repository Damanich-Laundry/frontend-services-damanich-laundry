"use client";

import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { mockStaffs } from '@/datas/dummies';
import { Staff } from '@/components/modules/staff-page/types';
import StaffTable from '@/components/modules/staff-page/StaffTable';
import { StaffHeader, StaffStats } from '@/components/modules/staff-page';

const StaffsPage = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const StaffData: Staff[] = mockStaffs;

  const totalStaff = StaffData.length;
  const staffActive = StaffData.filter(s => s.status === 'Aktif').length;
  const staffInactive = StaffData.filter(s => s.status === 'Non-Aktif').length;
  const staffOnDuty = StaffData.filter(s => s.status === 'Aktif').length; 

  const filteredStaff = StaffData.filter(staff =>
    staff.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
 
  const stats = {
    totalStaff: totalStaff,
    staffActive: staffActive,
    staffInactive: staffInactive,
    staffOnDuty: staffOnDuty
  };

  const handleEdit = (staffId: string) => {
    router.push(`/staffs/edit/${staffId}`);
  };

  const handleView = (staffId: string) => {
    console.log('View staff:', staffId);
  };

  const handleDelete = (staffId: string) => {
    console.log('Delete staff:', staffId);
  };

  const handleAddStaff = () => {
    router.push('/staffs/new');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>

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

export default StaffsPage;
