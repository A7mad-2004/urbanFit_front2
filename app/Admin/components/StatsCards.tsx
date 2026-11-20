interface StatsProps {
  sales: string | number;
  orderCount: number;
  userCount: number;
}

export default function StatsCards({
  sales,
  orderCount,
  userCount,
}: StatsProps) {
  return (
    <div className="stats-grid">
      {/* إجمالي المبيعات */}
      <div className="stat-card">
        <div className="stat-icon sales">
          <i className="fas fa-dollar-sign"></i>
        </div>
        <div className="stat-info">
          <h3>{sales}</h3>
          <p>إجمالي المبيعات</p>
        </div>
      </div>

      {/* إجمالي الطلبات */}
      <div className="stat-card">
        <div className="stat-icon orders">
          <i className="fas fa-shopping-bag"></i>
        </div>
        <div className="stat-info">
          <h3>{orderCount}</h3>
          <p>إجمالي الطلبات</p>
        </div>
      </div>

      {/* العملاء */}
      <div className="stat-card">
        <div className="stat-icon users">
          <i className="fas fa-users"></i>
        </div>
        <div className="stat-info">
          <h3>{userCount}</h3>
          <p>العملاء</p>
        </div>
      </div>
    </div>
  );
}
