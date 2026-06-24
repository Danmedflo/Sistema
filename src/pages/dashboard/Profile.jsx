import { useEffect, useState } from "react";  
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Toast from "../../components/ui/Toast";
import useAuth from "../../hooks/useAuth";
import { getProfile, upsertProfile } from "../../services/profileService";

function Profile() {
  const { user, loading } = useAuth();

  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    full_name: "",
    country: "Perú",
    currency: "PEN",
    avatar_url: "",
  });
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [pageError, setPageError] = useState("");
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

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.id) return;

      setIsLoadingProfile(true);
      setPageError("");

      const { data, error } = await getProfile(user.id);

      if (error) {
        setPageError("No se pudo cargar el perfil.");
        setIsLoadingProfile(false);
        return;
      }

      setProfile(data);
      setFormData({
        full_name:
          data?.full_name ||
          user?.user_metadata?.full_name ||
          user?.email?.split("@")[0] ||
          "",
        country: data?.country || "Perú",
        currency: data?.currency || "PEN",
        avatar_url: data?.avatar_url || "",
      });

      setIsLoadingProfile(false);
    };

    fetchProfile();
  }, [user?.id, user?.email, user?.user_metadata?.full_name]);

  const joinedAt = user?.created_at
  ? new Date(user.created_at).toLocaleDateString("es-PE", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  : "No disponible";

  const updatedAt = profile?.updated_at
  ? new Date(profile.updated_at).toLocaleDateString("es-PE", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  : "No disponible";

  const displayName =
    formData.full_name || user?.email?.split("@")[0] || "Usuario";

  const initial = displayName.charAt(0).toUpperCase();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!user?.id) {
      showToast("No hay usuario autenticado", "error");
      return;
    }

    setIsSaving(true);
    setPageError("");

    const payload = {
      id: user.id,
      full_name: formData.full_name.trim(),
      country: formData.country,
      currency: formData.currency,
      avatar_url: formData.avatar_url.trim() || null,
    };

    const { data, error } = await upsertProfile(payload);

    if (error) {
      setPageError("No se pudo guardar el perfil.");
      showToast("Error al guardar el perfil", "error");
      setIsSaving(false);
      return;
    }

    setProfile(data);
    showToast("Perfil actualizado correctamente");
    setIsSaving(false);
  };

  if (loading || isLoadingProfile) {
    return (
      <section className="panel-card status-card">
        <div className="status-loader"></div>
        <h3>Cargando perfil</h3>
        <p>Estamos trayendo la información de tu cuenta.</p>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="panel-card status-card status-card--error">
        <h3>No se pudo cargar el perfil</h3>
        <p className="form-error-message">
          No hay un usuario autenticado en este momento.
        </p>
      </section>
    );
  }

  return (
    <>
      <Toast message={toast.message} type={toast.type} />

      <div className="profile-page">
        <div className="page-header">
          <div>
            <h2>Perfil</h2>
            <p>Consulta y actualiza la información principal de tu cuenta.</p>
          </div>
        </div>

        <section className="panel-card profile-card">
          <div className="profile-top">
            <div className="profile-avatar">{initial}</div>
            <div>
              <h3>{displayName}</h3>
              <p>{user.email}</p>
            </div>
          </div>

          <div className="profile-grid">
            <div className="profile-field">
              <span>ID de usuario</span>
              <strong title={user.id}>
                {user.id.slice(0, 8)}...{user.id.slice(-6)}
              </strong>
            </div>

            <div className="profile-field">
              <span>Proveedor</span>
              <strong>{user.app_metadata?.provider || "email"}</strong>
            </div>

            <div className="profile-field">
              <span>Miembro desde</span>
              <strong>{joinedAt}</strong>
            </div>

            <div className="profile-field">
              <span>Última actualización</span>
              <strong>{updatedAt}</strong>
            </div>
          </div>
        </section>

        <section className="panel-card">
          <div className="panel-card-header">
            <h3>Editar perfil</h3>
          </div>

          <form className="transaction-form" onSubmit={handleSave}>
            <Input
              id="full_name"
              name="full_name"
              label="Nombre completo"
              value={formData.full_name}
              onChange={handleChange}
              placeholder="Tu nombre completo"
            />

            <Input
              id="email_readonly"
              name="email_readonly"
              label="Correo electrónico"
              value={user.email || ""}
              onChange={() => {}}
              placeholder=""
              type="email"
              disabled
            />

            <Input
              id="avatar_url"
              name="avatar_url"
              label="URL de avatar"
              value={formData.avatar_url}
              onChange={handleChange}
              placeholder="https://..."
            />

            <Select
              id="country"
              name="country"
              label="País"
              value={formData.country}
              onChange={handleChange}
              options={[
                { value: "Perú", label: "Perú" },
                { value: "Colombia", label: "Colombia" },
                { value: "México", label: "México" },
                { value: "Chile", label: "Chile" },
                { value: "Argentina", label: "Argentina" },
              ]}
            />

            <Select
              id="currency"
              name="currency"
              label="Moneda"
              value={formData.currency}
              onChange={handleChange}
              options={[
                { value: "PEN", label: "PEN - Sol peruano" },
                { value: "USD", label: "USD - Dólar" },
                { value: "EUR", label: "EUR - Euro" },
              ]}
            />

            {pageError && <p className="form-error-message">{pageError}</p>}

            <div className="transaction-form-actions">
              <Button type="submit">
                {isSaving ? "Guardando..." : "Guardar perfil"}
              </Button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}

export default Profile;