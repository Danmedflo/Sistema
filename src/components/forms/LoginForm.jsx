import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Toast from "../ui/Toast";

function LoginForm() {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({
    message: "",
    type: "success",
  });

  const showToast = (message, type = "success") => {
    setToast({ message, type });

    setTimeout(() => {
      setToast({ message: "", type: "success" });
    }, 2500);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    const { error } = await signIn(formData);

    if (error) {
      const message = error.message || "No se pudo iniciar sesión.";
      setErrorMessage(message);
      showToast("Credenciales incorrectas o acceso no disponible", "error");
      setIsSubmitting(false);
      return;
    }

    showToast("Inicio de sesión correcto");
    setTimeout(() => {
      navigate("/dashboard");
    }, 400);
  };

  return (
    <>
      <Toast message={toast.message} type={toast.type} />

      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Iniciar sesión</h2>
        <p className="login-subtext">Bienvenido de nuevo</p>

        <div className="form-group">
          <label htmlFor="email">Correo electrónico</label>
          <input
            id="email"
            type="email"
            placeholder="ejemplo@correo.com"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            placeholder="********"
            required
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        {errorMessage && (
          <p style={{ color: "#dc2626", marginBottom: "12px", fontWeight: 600 }}>
            {errorMessage}
          </p>
        )}

        <button type="submit" className="primary-btn" disabled={isSubmitting}>
          {isSubmitting ? "Ingresando..." : "Ingresar"}
        </button>
      </form>
    </>
  );
}

export default LoginForm;