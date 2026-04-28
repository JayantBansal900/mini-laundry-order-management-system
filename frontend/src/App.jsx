import { useEffect, useState } from "react";
import API from "./services/api";
import DashboardCards from "./components/DashboardCards";
import "./App.css";

function App() {
  const [dashboard, setDashboard] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    ordersPerStatus: {}
  });

  const fetchDashboard = async () => {
    try {
      const { data } = await API.get(
        "/orders/dashboard"
      );

      setDashboard(data.dashboard);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <div className="container">
      <h1 className="title">
        Mini Laundry Management System
      </h1>

      <DashboardCards dashboard={dashboard} />
    </div>
  );
}

export default App;