import RegisterForm from "../../components/forms/RegisterForm";

function Register() {
  return (
    <main className="auth-page">
      <section className="auth-box">
        <div className="auth-left">
          <h1>FinControl</h1>
          <p>Crea tu cuenta y empieza a administrar tus ingresos y gastos.</p>
        </div>

        <div className="auth-right">
          <RegisterForm />
        </div>
      </section>
    </main>
  );
}

export default Register;