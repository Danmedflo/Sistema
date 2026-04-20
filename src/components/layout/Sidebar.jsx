import { NavLink } from "react-router-dom";
import {
  FaHouse,
  FaMoneyBillTransfer,
  FaChartPie,
  FaLayerGroup,
  FaUser,
  FaGear,
  FaXmark,
} from "react-icons/fa6";
import useTheme from "../../hooks/useTheme";

function Sidebar() {
  const { isSidebarOpen, closeSidebar } = useTheme();

  const menuItems = [
    { to: "/dashboard", label: "Inicio", icon: <FaHouse /> },
    {
      to: "/dashboard/transactions",
      label: "Transacciones",
      icon: <FaMoneyBillTransfer />,
    },
    { to: "/dashboard/reports", label: "Reportes", icon: <FaChartPie /> },
    { to: "/dashboard/categories", label: "Categorías", icon: <FaLayerGroup /> },
    { to: "/dashboard/profile", label: "Perfil", icon: <FaUser /> },
    { to: "/dashboard/settings", label: "Ajustes", icon: <FaGear /> },
  ];

  return (
    <aside className={`sidebar ${isSidebarOpen ? "sidebar-open" : ""}`}>
      <div className="sidebar-top-mobile">
        <button className="sidebar-close-btn" onClick={closeSidebar}>
          <FaXmark />
        </button>
      </div>

      <div className="sidebar-logo">
        <h2>FinControl</h2>
        <p>Mis finanzas</p>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/dashboard"}
            onClick={closeSidebar}
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;