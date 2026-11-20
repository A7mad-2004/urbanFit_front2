import { useRouter } from "next/navigation";
interface Order {
  id: number;
  total_amount: number;
  status: string;
  created_at: string;
  user: { name: string };
}
interface RecentOrdersProps {
  orders: Order[];
}
export default function RecentOrders({ orders }: RecentOrdersProps) {
  const router = useRouter();
  return (
    <div className="recent-orders">
      <div className="section-header">
        <h3>آخر الطلبات</h3>
        <button
          onClick={() => router.push(`/Admin/orders`)}
          className="btn-view"
        >
          <i className="fas fa-eye"></i> عرض
        </button>
      </div>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>رقم الطلب</th>
              <th>العميل</th>
              <th>المبلغ</th>
              <th>الحالة</th>
              <th>التاريخ</th>
              <th>إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{order.user?.name || "غير معروف"}</td>
                  <td>{order.total_amount} شيكل</td>
                  <td>
                    <span className={`status ${order.status}`}>
                      {order.status === "pending"
                        ? "قيد الانتظار"
                        : order.status === "completed"
                          ? "مكتمل"
                          : order.status}
                    </span>
                  </td>
                  <td>
                    {new Date(order.created_at).toLocaleDateString("ar-EG")}
                  </td>
                  <td>
                    <button
                      onClick={() =>
                        router.push(`/Admin/order-details?id=${order.id}`)
                      }
                      className="btn-view"
                    >
                      <i className="fas fa-eye"></i> عرض
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="table-empty">
                  لا توجد طلبات بعد
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
