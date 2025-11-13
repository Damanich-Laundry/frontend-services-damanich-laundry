"use client";

import React, { useMemo } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { ArrowLeft } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import StaffForm from '@/components/modules/staff-page/StaffForm';
import { mockStaffs } from '@/datas/dummies';
import { Staff } from '@/components/modules/staff-page/types';

const EditStaffPage = () => {
  const router = useRouter();
  const params = useParams();
  const staffId = Array.isArray(params?.staffId) ? params.staffId[0] : (params?.staffId as string | undefined);

  const staff: Staff | undefined = useMemo(() => {
    if (!staffId) return undefined;
    return mockStaffs.find((s) => s.id === staffId);
  }, [staffId]);

  const handleSubmit = (data: Omit<Staff, 'id'>) => {
    console.log('Updated staff data:', { id: staffId, ...data });
    router.push('/staffs');
  };

  const handleCancel = () => {
    router.push('/staffs');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Edit Data Staff
          </Typography>
          {staff && (
            <Typography variant="body2" color="text.secondary">
              {staff.name} • {staff.position} • {staff.phone}
            </Typography>
          )}
        </Box>
        <Button
          variant="outlined"
          startIcon={<ArrowLeft size={16} />}
          onClick={handleCancel}
          sx={{
            borderColor: '#d1d5db',
            color: '#374151',
            '&:hover': {
              borderColor: '#9ca3af',
              backgroundColor: '#f9fafb'
            }
          }}
        >
          Kembali ke Data Staff
        </Button>
      </Box>

      <StaffForm
        initialData={staff}
        isEditMode
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </Box>
  );
};

export default EditStaffPage;

