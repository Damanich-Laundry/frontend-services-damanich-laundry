"use client";

import { Card, CardContent, Box, Typography } from '@mui/material';
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  iconColor?: string;
  iconBgColor?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor = "text-blue-600",
  iconBgColor = "bg-blue-100",
  trend
}: StatCardProps) {
  return (
    <Card sx={{ boxShadow: 1 }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
              {title}
            </Typography>
            <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
              {value}
            </Typography>
            {subtitle && (
              <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                {subtitle}
              </Typography>
            )}
            {trend && (
              <Typography 
                variant="caption" 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  mt: 0.5,
                  color: trend.isPositive ? 'success.main' : 'error.main'
                }}
              >
                <span style={{ marginRight: 4 }}>{trend.isPositive ? '↗' : '↘'}</span>
                {trend.value}
              </Typography>
            )}
          </Box>
          <Box 
            className={`${iconBgColor} ${iconColor} rounded-lg flex items-center justify-center`}
            sx={{ 
              width: 48, 
              height: 48, 
              borderRadius: 1.5, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center'
            }}
          >
            <Icon size={24} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
