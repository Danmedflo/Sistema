import { mockUser } from "../../data/mockUser";

function Profile() {
  return (
    <div className="profile-page">
      <div className="page-header">
        <div>
          <h2>Perfil</h2>
          <p>Consulta la información principal de tu cuenta.</p>
        </div>
      </div>

      <section className="panel-card profile-card">
        <div className="profile-top">
          <div className="profile-avatar">L</div>
          <div>
            <h3>{mockUser.name}</h3>
            <p>{mockUser.email}</p>
          </div>
        </div>

        <div className="profile-grid">
          <div className="profile-field">
            <span>Plan</span>
            <strong>{mockUser.plan}</strong>
          </div>

          <div className="profile-field">
            <span>Moneda</span>
            <strong>{mockUser.currency}</strong>
          </div>

          <div className="profile-field">
            <span>País</span>
            <strong>{mockUser.country}</strong>
          </div>

          <div className="profile-field">
            <span>Miembro desde</span>
            <strong>{mockUser.joinedAt}</strong>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Profile;