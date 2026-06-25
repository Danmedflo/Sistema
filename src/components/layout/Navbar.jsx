import { useEffect, useState } from "react";
import {
  FaBars,
  FaMoon,
  FaRightFromBracket,
  FaSun,
} from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import useTheme from "../../hooks/useTheme";
import { getProfile } from "../../services/profileService";

const pageMap = {
  "/dashboard": {
    title: "Panel principal",
    subtitle: "Controla tus ingresos y gastos",
  },
  "/dashboard/transactions": {
    title: "Transacciones",
    subtitle: "Gestiona tus movimientos registrados",
  },
  "/dashboard/reports": {
    title: "Reportes",
    subtitle: "Visualiza el comportamiento de tus finanzas",
  },
  "/dashboard/categories": {
    title: "Categorías",
    subtitle: "Organiza ingresos y gastos",
  },
  "/dashboard/profile": {
    title: "Perfil",
    subtitle: "Información principal de tu cuenta",
  },
  "/dashboard/settings": {
    title: "Ajustes",
    subtitle: "Personaliza la aplicación",
  },
};

function Navbar() {
  const { theme, toggleTheme, toggleSidebar } = useTheme();
  const { user, signOut } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const [profile, setProfile] = useState(null);

  const currentPage = pageMap[location.pathname] || pageMap["/dashboard"];

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.id) return;

      const { data, error } = await getProfile(user.id);

      if (!error) {
        setProfile(data);
      }
    };

    fetchProfile();
  }, [user?.id]);

  const handleLogout = async () => {
    const { error } = await signOut();

    if (!error) {
      navigate("/login");
    }
  };

  const displayName =
    profile?.full_name?.trim() ||
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email?.split("@")[0] ||
    "Usuario";

  const initial = displayName.charAt(0).toUpperCase();

  return (
    <header className="navbar">
      <div className="navbar-left">
        <button
          type="button"
          className="menu-toggle-btn"
          onClick={toggleSidebar}
          aria-label="Abrir menú"
        >
          <FaBars />
        </button>

        <div>
          <h1 className="navbar-title">{currentPage.title}</h1>
          <p className="navbar-subtitle">{currentPage.subtitle}</p>
        </div>
      </div>

      <div className="navbar-actions">
        <button
          type="button"
          className="theme-toggle-btn"
          onClick={toggleTheme}
          aria-label="Cambiar tema"
        >
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </button>

        <div className="navbar-user">
          <div className="navbar-avatar">{initial}</div>

          <div className="navbar-user-info">
            <strong>{displayName}</strong>
            <p>{user?.email || "Usuario autenticado"}</p>
          </div>
        </div>

        <button
          type="button"
          className="logout-btn"
          onClick={handleLogout}
          aria-label="Cerrar sesión"
        >
          <FaRightFromBracket />
        </button>
      </div>
    </header>
  );
}

export default Navbar;