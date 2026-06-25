import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import Input from "../ui/Input";
import Button from "../ui/Button";
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

    const { error } = await signIn({
      email: formData.email.trim(),
      password: formData.password,
    });

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
      {toast.message && <Toast message={toast.message} type={toast.type} />}

      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Iniciar sesión</h2>
        <p className="login-subtext">Bienvenido de nuevo</p>

        <Input
          id="email"
          label="Correo electrónico"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="ejemplo@correo.com"
          required
        />

        <Input
          id="password"
          label="Contraseña"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="********"
          required
        />

        {errorMessage && <p className="form-error-message">{errorMessage}</p>}

        <Button type="submit" fullWidth>
          {isSubmitting ? "Ingresando..." : "Ingresar"}
        </Button>

        <p className="auth-link-text">
          ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
        </p>
      </form>
    </>
  );
}

export default LoginForm;