import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <div>
        <h1>404</h1>
        <p>Página no encontrada.</p>
        <Link to="/login">Volver al login</Link>
      </div>
    </div>
  );
}

export default NotFound;