"use client";

import { 
  ShoppingCart, 
  DollarSign, 
  Users, 
  Shirt,
  Plus,
  TrendingUp
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  Button, 
  Table, 
  TableHead, 
  TableBody, 
  TableRow, 
  TableCell, 
  Select, 
  MenuItem, 
  FormControl,
  InputLabel,
  Box,
  Typography,
  Avatar
} from '@mui/material';
import { StatCard, StatusBadge } from "@/components/shared";
import MyModal from "@/components/Modal/MyModal";
import { useState } from "react";

export default function Home() {
  const [addOrderModalOpen, setAddOrderModalOpen] = useState(false);

  const ordersData = [
    { id: "ORD-001", customer: "Kevin", amount: "Rp 45.000", status: "Proses", avatar: "K", avatarColor: "bg-blue-100 text-blue-600" },
    { id: "ORD-002", customer: "Damanik", amount: "Rp 32.000", status: "Selesai", avatar: "D", avatarColor: "bg-green-100 text-green-600" },
    { id: "ORD-003", customer: "Andi", amount: "Rp 28.000", status: "Baru", avatar: "A", avatarColor: "bg-purple-100 text-purple-600" },
  ];

  const tableData = [
    { orderNumber: "#LD001", customerName: "Kevin Sipahutar", status: "Dalam Proses", total: "Rp 45.000", date: "15 Jan 2025" },
    { orderNumber: "#LD002", customerName: "Damanik", status: "Selesai", total: "Rp 32.000", date: "15 Jan 2025" },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
        gap: 3 
      }}>
        <StatCard
          title="Order Hari Ini"
          value="42"
          icon={ShoppingCart}
          iconColor="text-blue-600"
          iconBgColor="bg-blue-100"
          trend={{ value: "+12% dari kemarin", isPositive: true }}
        />
        
        <StatCard
          title="Pendapatan Hari Ini"
          value="Rp 2.4M"
          icon={DollarSign}
          iconColor="text-green-600"
          iconBgColor="bg-green-100"
          trend={{ value: "+8% dari kemarin", isPositive: true }}
        />
        
        <StatCard
          title="Pelanggan Baru"
          value="8"
          subtitle="Bulan Ini"
          icon={Users}
          iconColor="text-purple-600"
          iconBgColor="bg-purple-100"
        />
        
        <StatCard
          title="Layanan"
          value="3"
          subtitle="Layanan tersedia"
          icon={Shirt}
          iconColor="text-orange-600"
          iconBgColor="bg-orange-100"
        />
      </Box>

      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, 1fr)' },
        gap: 3 
      }}>
        <Card sx={{ boxShadow: 1 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Pendapatan Mingguan
                </Typography>
                <FormControl size="small" sx={{ minWidth: 160 }}>
                  <InputLabel>Periode</InputLabel>
                  <Select value="7days" label="Periode">
                    <MenuItem value="7days">7 Hari Terakhir</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ 
                height: 256, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                backgroundColor: '#f9fafb', 
                borderRadius: 1 
              }}>
                <Box sx={{ textAlign: 'center', color: '#6b7280' }}>
                  <TrendingUp size={48} style={{ margin: '0 auto 8px', color: '#9ca3af' }} />
                  <Typography variant="body2">Grafik Pendapatan</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>

        <Card sx={{ boxShadow: 1 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Order Terbaru
                </Typography>
                <Button variant="text" size="small" sx={{ color: '#1976d2' }}>
                  Lihat Semua
                </Button>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {ordersData.map((order, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Avatar sx={{ 
                      width: 32, 
                      height: 32, 
                      fontSize: '0.75rem',
                      backgroundColor: order.avatarColor.includes('blue') ? '#dbeafe' : 
                                      order.avatarColor.includes('green') ? '#dcfce7' : '#f3e8ff',
                      color: order.avatarColor.includes('blue') ? '#1d4ed8' : 
                             order.avatarColor.includes('green') ? '#16a34a' : '#9333ea'
                    }}>
                      {order.avatar}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {order.id}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {order.customer}
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {order.amount}
                      </Typography>
                      <StatusBadge status={order.status} size="sm" />
                    </Box>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
      </Box>

      <Card sx={{ boxShadow: 1 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Pesanan Terbaru
            </Typography>
            <Button 
              variant="contained"
              startIcon={<Plus size={16} />}
              onClick={() => setAddOrderModalOpen(true)}
            >
              Tambah Pesanan Baru
            </Button>
          </Box>
          
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>NOMOR PESANAN</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>NAMA PELANGGAN</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>STATUS</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>TOTAL</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>TANGGAL</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.orderNumber}</TableCell>
                  <TableCell>{row.customerName}</TableCell>
                  <TableCell>
                    <StatusBadge status={row.status} />
                  </TableCell>
                  <TableCell>{row.total}</TableCell>
                  <TableCell>{row.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <MyModal
        title="Tambah Pesanan Baru" 
        onOpen={() => setAddOrderModalOpen(true)} 
        isOpen={addOrderModalOpen} 
        onOpenChange={setAddOrderModalOpen}
        size="2xl"
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography color="text.secondary">
            Form tambah pesanan akan ditambahkan di sini
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
            <Button 
              variant="outlined" 
              onClick={() => setAddOrderModalOpen(false)}
              sx={{ flex: 1 }}
            >
              Batal
            </Button>
            <Button 
              variant="contained" 
              onClick={() => setAddOrderModalOpen(false)}
              sx={{ flex: 1 }}
            >
              Simpan
            </Button>
          </Box>
        </Box>
      </MyModal>
    </Box>
  );
}