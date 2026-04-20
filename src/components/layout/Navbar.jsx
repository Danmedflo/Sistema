import { FaMoon, FaSun, FaRightFromBracket } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import useTheme from "../../hooks/useTheme";
import useAuth from "../../hooks/useAuth";

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await signOut();

    if (!error) {
      navigate("/login");
    }
  };

  const displayName =
    user?.user_metadata?.name ||
    user?.email?.split("@")[0] ||
    "Usuario";

  const initial = displayName.charAt(0).toUpperCase();

  return (
    <header className="navbar">
      <div>
        <h1 className="navbar-title">Panel principal</h1>
        <p className="navbar-subtitle">Controla tus ingresos y gastos</p>
      </div>

      <div className="navbar-actions">
        <button className="theme-toggle-btn" onClick={toggleTheme}>
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </button>

        <div className="navbar-user">
          <div className="navbar-avatar">{initial}</div>
          <div>
            <strong>{displayName}</strong>
            <p>{user?.email || "Usuario autenticado"}</p>
          </div>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          <FaRightFromBracket />
        </button>
      </div>
    </header>
  );
}

export default Navbar;