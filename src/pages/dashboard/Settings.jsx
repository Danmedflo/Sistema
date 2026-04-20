import Button from "../../components/ui/Button";
import useTheme from "../../hooks/useTheme";

function Settings() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="settings-page">
      <div className="page-header">
        <div>
          <h2>Ajustes</h2>
          <p>Personaliza la apariencia general de la aplicación.</p>
        </div>
      </div>

      <section className="panel-card settings-card">
        <div className="settings-block">
          <div>
            <h3>Tema de la aplicación</h3>
            <p>Selecciona cómo quieres visualizar la interfaz.</p>
          </div>

          <div className="settings-actions">
            <Button
              variant={theme === "light" ? "primary" : "secondary"}
              onClick={() => setTheme("light")}
            >
              Modo claro
            </Button>

            <Button
              variant={theme === "dark" ? "primary" : "secondary"}
              onClick={() => setTheme("dark")}
            >
              Modo oscuro
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Settings;