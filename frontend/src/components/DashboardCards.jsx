function DashboardCards({ dashboard }) {
  return (
    <div className="dashboard-grid">
      <div className="card">
        <h3>Total Orders</h3>
        <p>{dashboard.totalOrders}</p>
      </div>

      <div className="card">
        <h3>Total Revenue</h3>
        <p>₹ {dashboard.totalRevenue}</p>
      </div>

      <div className="card">
        <h3>Orders Status</h3>

        {Object.entries(
          dashboard.ordersPerStatus || {}
        ).map(([status, count]) => (
          <p key={status}>
            {status}: {count}
          </p>
        ))}
      </div>
    </div>
  );
}

export default DashboardCards;