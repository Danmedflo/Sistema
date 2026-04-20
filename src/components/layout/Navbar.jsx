import { FaMoon, FaSun } from "react-icons/fa6";
import useTheme from "../../hooks/useTheme";

function Navbar() {
  const { theme, toggleTheme } = useTheme();

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
          <div className="navbar-avatar">L</div>
          <div>
            <strong>Loki</strong>
            <p>Usuario demo</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;