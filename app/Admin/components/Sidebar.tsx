"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";

interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
}

export default function Sidebar({ isOpen, closeSidebar }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      console.error("خطأ في تسجيل الخروج", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("role");
      router.push("/login");
    }
  };

  const menuItems = [
    { name: "لوحة التحكم", path: "/Admin/dashboard", icon: "fa-chart-pie" },
    { name: "المنتجات", path: "/Admin/products", icon: "fa-box" },
    { name: "التصنيفات", path: "/Admin/categories", icon: "fa-tags" },
    { name: "الطلبات", path: "/Admin/AdminOrders", icon: "fa-shopping-cart" },
    { name: "العملاء", path: "/Admin/customers", icon: "fa-users" },
    { name: "الكوبونات", path: "/Admin/coupons", icon: "fa-ticket" },
  ];

  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-brand">
         Urban<span>Fit</span>
      </div>
      <ul className="sidebar-menu">
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link 
              href={item.path} 
              className={pathname.startsWith(item.path) ? "active" : ""}
              onClick={closeSidebar}
            >
              <i className={`fas ${item.icon}`}></i> {item.name}
            </Link>
          </li>
        ))}
        <li>
          <button onClick={handleLogout} className="sidebar-logout">
            <i className="fas fa-sign-out-alt"></i> تسجيل الخروج
          </button>
        </li>
      </ul>
    </aside>
  );
}