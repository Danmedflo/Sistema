function Navbar() {
  return (
    <header className="navbar">
      <div>
        <h1 className="navbar-title">Panel principal</h1>
        <p className="navbar-subtitle">Controla tus ingresos y gastos</p>
      </div>

      <div className="navbar-user">
        <div className="navbar-avatar">L</div>
        <div>
          <strong>Loki</strong>
          <p>Usuario demo</p>
        </div>
      </div>
    </header>
  );
}

export default Navbar;