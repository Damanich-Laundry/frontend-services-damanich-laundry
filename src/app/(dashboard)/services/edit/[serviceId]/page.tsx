"use client";

import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { ArrowLeft } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import ServiceForm from '@/components/modules/services-page/ServiceForm';
import ServicePreview from '@/components/modules/services-page/ServicePreview';
import ServiceInfoCard from '@/components/modules/services-page/ServiceInfoCard';
import { Service } from '@/components/modules/services-page/types';
import { mockService } from '@/datas/dummies';

const EditServicePage = () => {
  const router = useRouter();
  const params = useParams();
  const serviceId = params?.serviceId as string;

  // Mock service data - in production, fetch from API
  const [serviceData, setServiceData] = useState<Service | null>(null);
  const [previewData, setPreviewData] = useState<Partial<Service> & { isPopular?: boolean }>({});

  useEffect(() => {
    // Mock data - replace with actual API call
    const service: Service = {
      ...mockService,
      id: serviceId || mockService.id
    };
    setServiceData(service);
    const initialPreview = {
      ...service,
      isPopular: false
    };
    setPreviewData(initialPreview);
  }, [serviceId]);

  const handleSubmit = (data: any) => {
    console.log('Service data to update:', { ...data, id: serviceId });
    // TODO: Implement API call to update service
    // After successful update, navigate back to services page
    router.push('/services');
  };

  const handleCancel = () => {
    router.push('/services');
  };

  const handleFormChange = (data: Partial<Service> & { isPopular?: boolean }) => {
    setPreviewData(data);
  };

  if (!serviceData) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Page Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Edit Data Layanan
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Perbarui data layanan yang sudah ada
          </Typography>
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
          Kembali ke Data Layanan
        </Button>
      </Box>

      {/* Main Content - Two Column Layout */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' },
        gap: 3 
      }}>
        {/* Left Column - Form */}
        <Box>
          <ServiceForm
            initialData={{
              ...serviceData,
              isPopular: previewData.isPopular
            }}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isEditMode={true}
            onFormChange={handleFormChange}
          />
        </Box>

        {/* Right Column - Sidebar */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <ServicePreview service={previewData} />
          <ServiceInfoCard />
        </Box>
      </Box>
    </Box>
  );
};

export default EditServicePage;
