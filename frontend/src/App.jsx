import { useCallback, useEffect, useState } from "react";

import API from "./services/api";

import DashboardCards from "./components/DashboardCards";
import CreateOrderForm from "./components/CreateOrderForm";
import OrdersTable from "./components/OrdersTable";

import "./App.css";

function App() {
  const [dashboard, setDashboard] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    ordersPerStatus: {}
  });

  const [orders, setOrders] = useState([]);

  // FETCH DASHBOARD
  const fetchDashboard = useCallback(async () => {
    try {
      const { data } = await API.get(
        "/orders/dashboard"
      );

      setDashboard(data.dashboard);
    } catch (error) {
      console.log(error);
    }
  }, []);

  // FETCH ORDERS
  const fetchOrders = useCallback(async () => {
    try {
      const { data } = await API.get("/orders");

      setOrders(data.orders);
    } catch (error) {
      console.log(error);
    }
  }, []);

  // REFRESH EVERYTHING
  const refreshData = useCallback(() => {
    fetchDashboard();
    fetchOrders();
  }, [fetchDashboard, fetchOrders]);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  return (
    <div className="container">
      <h1 className="title">
        Mini Laundry Management System
      </h1>

      <DashboardCards dashboard={dashboard} />

      <CreateOrderForm
        refreshDashboard={refreshData}
      />

      <OrdersTable
        orders={orders}
        refreshOrders={refreshData}
      />
    </div>
  );
}

export default App;