import LoginForm from "../../components/forms/LoginForm";

function Login() {
  return (
    <section className="auth-page">
      <div className="auth-box">
        <div className="auth-left">
          <h1>FinControl</h1>
          <p>
            Administra tus ingresos, gastos y reportes en un solo lugar.
          </p>
        </div>

        <div className="auth-right">
          <LoginForm />
        </div>
      </div>
    </section>
  );
}

export default Login;