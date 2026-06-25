import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import useTheme from "../../hooks/useTheme";
import "./layout.css";

function MainLayout() {
  const { isSidebarOpen, closeSidebar } = useTheme();
  const location = useLocation();

  useEffect(() => {
    closeSidebar();
  }, [location.pathname, closeSidebar]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeSidebar();
      }
    };

    if (isSidebarOpen) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isSidebarOpen, closeSidebar]);

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <button
        type="button"
        className={`sidebar-backdrop ${isSidebarOpen ? "show" : ""}`}
        onClick={closeSidebar}
        aria-label="Cerrar menú lateral"
      />

      <main className="dashboard-main">
        <Navbar />

        <section className="dashboard-content">
          <Outlet />
        </section>
      </main>
    </div>
  );
}

export default MainLayout;