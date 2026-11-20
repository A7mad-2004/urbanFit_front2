"use client";

import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import "./layout.css";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const [title, setTitle] = useState("");
  const getPageTitle = () => {
    if (pathname.includes("/Admin/dashboard")) return "لوحة التحكم";
    if (pathname.includes("/Admin/products")) return "المنتجات";
    if (pathname.includes("/Admin/categories")) return "التصنيفات";
    if (pathname.includes("/Admin/AdminOrders")) return "الطلبات";
    if (pathname.includes("/Admin/customers")) return "المستخدمين";
    if (pathname.includes("/Admin/coupons")) return "كوبونات الخصم";
    return "لوحة التحكم"; // عنوان افتراضي
  };


  return (
    <div className="admin-wrapper">
      {/* 1. السايدبار */}
      <Sidebar
        isOpen={sidebarOpen}
        closeSidebar={() => setSidebarOpen(false)}
      />

      {/* 2. المحتوى الرئيسي */}
      <main className="main-content">
        {/* 3. الشريط العلوي */}
        <Topbar
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          title={getPageTitle()}
        />

        {/* 4. محتوى الصفحة الفعلي */}
        <div className="content-area">{children}</div>
      </main>
    </div>
  );
}
