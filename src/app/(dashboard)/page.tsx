"use client";

import { 
  ShoppingCart, 
  DollarSign, 
  Users, 
  Shirt,
  Plus,
  TrendingUp
} from "lucide-react";
import { Card, CardBody, CardHeader, Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Select, SelectItem, useDisclosure } from "@heroui/react";
import { StatCard, StatusBadge } from "@/components/shared";
import MyModal from "@/components/Modal/MyModal";

export default function Home() {
  const addOrderModal = useDisclosure();

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
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Pendapatan Mingguan</h3>
            <Select size="sm" defaultSelectedKeys={["7days"]} className="w-40">
              <SelectItem key="7days">7 Hari Terakhir</SelectItem>
            </Select>
          </CardHeader>
          <CardBody>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center text-gray-500">
                <TrendingUp className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                <p>Grafik Pendapatan</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Order Terbaru</h3>
            <Button variant="light" size="sm" className="text-blue-600">
              Lihat Semua
            </Button>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {ordersData.map((order, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className={`w-8 h-8 ${order.avatarColor} rounded-full flex items-center justify-center`}>
                    <span className="text-xs font-medium">{order.avatar}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{order.id}</p>
                    <p className="text-xs text-gray-500">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{order.amount}</p>
                    <StatusBadge status={order.status} size="sm" />
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      <Card className="shadow-sm">
        <CardHeader className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Pesanan Terbaru</h3>
          <Button 
            color="primary" 
            startContent={<Plus className="w-4 h-4" />}
            onPress={addOrderModal.onOpen}
          >
            Tambah Pesanan Baru
          </Button>
        </CardHeader>
        <CardBody className="p-0">
          <Table aria-label="Orders table">
            <TableHeader>
              <TableColumn>NOMOR PESANAN</TableColumn>
              <TableColumn>NAMA PELANGGAN</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>TOTAL</TableColumn>
              <TableColumn>TANGGAL</TableColumn>
            </TableHeader>
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
        </CardBody>
      </Card>

      <MyModal
        title="Tambah Pesanan Baru" 
        onOpen={addOrderModal.onOpen} 
        isOpen={addOrderModal.isOpen} 
        onOpenChange={addOrderModal.onOpenChange}
        size="2xl"
      >
        <div className="space-y-4">
          <p className="text-zinc-400">Form tambah pesanan akan ditambahkan di sini</p>
          
          <div className="flex gap-2 mt-6">
            <Button 
              color="primary" 
              className="w-1/2"
            >
              <Plus className="w-4 h-4" /> Simpan
            </Button>
            <Button 
              color="danger" 
              className="w-1/2" 
              variant="flat"
              onPress={addOrderModal.onClose}
            >
              Batal
            </Button>
          </div>
        </div>
      </MyModal>
    </div>
  );
}