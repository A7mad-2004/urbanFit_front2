"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import StatsCards from "../components/StatsCards";
import RecentOrders from "../components/RecentOrders";
import "./dashboard.css"; 

export default function DashboardPage() {
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({
    sales: 0,
    order_count: 0,
    user_count: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/dashboard`,
          { headers: { Authorization: `Bearer ${token}` } },
        );

        setOrders(response.data.orders || []);
        setStats({
          sales: response.data.sales || 0,
          order_count: response.data.order_count || 0,
          user_count: response.data.user_count || 0,
        });
      } catch (error) {
        console.error("خطأ في جلب بيانات لوحة التحكم:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading)
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        جاري التحميل...
      </div>
    );

  return (
    <div>
      <StatsCards
        sales={`${stats.sales} شيكل`}
        orderCount={stats.order_count}
        userCount={stats.user_count}
      />
      <RecentOrders orders={orders} />
    </div>
  );
}
