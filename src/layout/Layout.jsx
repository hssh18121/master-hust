import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => navigate("/topics"), [navigate]);
  return (
    <div className="h-full">
      <Header />
      <div className="flex h-[92vh]">
        <Sidebar />
        <div className="bg-gray-200 w-4/5 h-full overflow-scroll">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
