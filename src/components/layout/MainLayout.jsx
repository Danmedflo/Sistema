import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import useTheme from "../../hooks/useTheme";
import "./layout.css";

function MainLayout() {
  const { isSidebarOpen, closeSidebar } = useTheme();

  return (
    <div className="dashboard-layout">
      <div
        className={`sidebar-mobile-overlay ${isSidebarOpen ? "show" : ""}`}
        onClick={closeSidebar}
      />

      <Sidebar />

      <div className="dashboard-main">
        <Navbar />
        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;