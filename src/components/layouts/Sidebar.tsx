"use client";

import { 
  BarChart3, 
  ShoppingCart, 
  Users, 
  DollarSign, 
  Package, 
  Settings, 
  User, 
  FileText,
  X
} from "lucide-react";
import { Button, Avatar } from "@heroui/react";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const menuItems = [
  { icon: BarChart3, label: "Dashboard", active: true },
  { icon: ShoppingCart, label: "Order", active: false },
  { icon: Users, label: "Pelanggan", active: false },
  { icon: DollarSign, label: "Keuangan", active: false },
  { icon: Package, label: "Inventory", active: false },
  { icon: Settings, label: "Layanan", active: false },
  { icon: User, label: "Staff", active: false },
  { icon: FileText, label: "Laporan", active: false },
  { icon: Settings, label: "Pengaturan", active: false },
];

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      <div className={`
        fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-50 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
        w-64
      `}>
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Avatar 
              name="DL" 
              className="w-8 h-8 bg-blue-600 text-white font-bold text-sm"
              classNames={{
                base: "bg-blue-600",
                name: "text-white font-bold text-sm"
              }}
            />
            <h1 className="text-lg font-semibold text-gray-900">Damanich Laundry</h1>
          </div>
          <Button 
            isIconOnly
            variant="light"
            onClick={onToggle}
            className="lg:hidden"
          >
            <X className="w-5 h-5 text-gray-600" />
          </Button>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <li key={index}>
                  <Button
                    variant={item.active ? "solid" : "light"}
                    className={`
                      w-full justify-start h-auto px-3 py-2
                      ${item.active 
                        ? 'bg-gray-100 text-gray-900' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }
                    `}
                    startContent={<Icon className="w-5 h-5" />}
                  >
                    <span className="font-medium">{item.label}</span>
                  </Button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
}
