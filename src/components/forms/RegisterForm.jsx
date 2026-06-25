import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Toast from "../ui/Toast";

function RegisterForm() {
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
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

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      return "Debes ingresar tu nombre completo.";
    }

    if (!formData.email.trim()) {
      return "Debes ingresar tu correo electrónico.";
    }

    if (formData.password.length < 6) {
      return "La contraseña debe tener al menos 6 caracteres.";
    }

    if (formData.password !== formData.confirmPassword) {
      return "Las contraseñas no coinciden.";
    }

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const validationError = validateForm();

    if (validationError) {
      setErrorMessage(validationError);
      showToast(validationError, "error");
      return;
    }

    setIsSubmitting(true);

    const { error } = await signUp({
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      password: formData.password,
    });

    if (error) {
      const message = error.message || "No se pudo crear la cuenta.";
      setErrorMessage(message);
      showToast(message, "error");
      setIsSubmitting(false);
      return;
    }

    showToast("Cuenta creada correctamente");

    setTimeout(() => {
      navigate("/login");
    }, 700);
  };

  return (
    <>
      {toast.message && <Toast message={toast.message} type={toast.type} />}

      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Crear cuenta</h2>
        <p className="login-subtext">
          Regístrate para empezar a usar FinControl
        </p>

        <Input
          id="fullName"
          label="Nombre completo"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Ej. Juan Pérez"
          required
        />

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

        <Input
          id="confirmPassword"
          label="Confirmar contraseña"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="********"
          required
        />

        {errorMessage && <p className="form-error-message">{errorMessage}</p>}

        <Button type="submit" fullWidth>
          {isSubmitting ? "Creando cuenta..." : "Registrarme"}
        </Button>

        <p className="auth-link-text">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </form>
    </>
  );
}

export default RegisterForm;