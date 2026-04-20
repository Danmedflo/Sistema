import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function PublicRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div style={{ padding: "2rem" }}>Cargando sesión...</div>;
  }

  return !isAuthenticated ? children : <Navigate to="/dashboard" replace />;
}

export default PublicRoute;