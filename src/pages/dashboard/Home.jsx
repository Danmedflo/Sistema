import { useEffect, useMemo, useState } from "react";
import {
  FaWallet,
  FaArrowTrendUp,
  FaArrowTrendDown,
  FaPiggyBank,
} from "react-icons/fa6";
import StatCard from "../../components/ui/StatCard";
import RecentTransactions from "../../components/ui/RecentTransactions";
import IncomeExpenseChart from "../../components/charts/IncomeExpenseChart";
import CategoryChart from "../../components/charts/CategoryChart";
import { getTransactions } from "../../services/transactionService";
import useAuth from "../../hooks/useAuth";
import {
  groupTransactionsByMonth,
  groupExpensesByCategory,
} from "../../utils/chartHelpers";

function Home() {
  const { user } = useAuth();

  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageError, setPageError] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!user?.id) return;

      setIsLoading(true);
      setPageError("");

      const { data, error } = await getTransactions(user.id);

      if (error) {
        setPageError("No se pudo cargar el dashboard.");
        setIsLoading(false);
        return;
      }

      setTransactions(data || []);
      setIsLoading(false);
    };

    fetchTransactions();
  }, [user?.id]);

  const totals = useMemo(() => {
    const income = transactions
      .filter((item) => item.type === "Ingreso")
      .reduce((acc, item) => acc + Number(item.amount), 0);

    const expense = transactions
      .filter((item) => item.type === "Gasto")
      .reduce((acc, item) => acc + Number(item.amount), 0);

    return {
      totalBalance: income - expense,
      monthlyIncome: income,
      monthlyExpenses: expense,
      monthlySavings: income - expense,
    };
  }, [transactions]);

  const monthlyData = useMemo(() => {
    return groupTransactionsByMonth(transactions);
  }, [transactions]);

  const categoryData = useMemo(() => {
    return groupExpensesByCategory(transactions);
  }, [transactions]);

  const recentTransactions = useMemo(() => {
    return [...transactions].slice(0, 5);
  }, [transactions]);

  if (isLoading) {
    return (
      <section className="panel-card status-card">
        <div className="status-loader"></div>
        <h3>Cargando dashboard</h3>
        <p>Estamos trayendo tus movimientos y resumen general.</p>
      </section>
    );
  }

  if (pageError) {
    return (
      <section className="panel-card status-card status-card--error">
        <h3>Ups, algo salió mal</h3>
        <p className="form-error-message">{pageError}</p>
      </section>
    );
  }

  if (!transactions.length) {
    return (
      <section className="panel-card status-card">
        <h3>Aún no tienes movimientos</h3>
        <p>
          Registra tu primera transacción para ver tu saldo, gráficos y últimas
          operaciones aquí.
        </p>
      </section>
    );
  }

  return (
    <div className="dashboard-home">
      <section className="stats-grid">
        <StatCard
          title="Saldo total"
          amount={totals.totalBalance}
          icon={<FaWallet />}
          variant="primary"
        />
        <StatCard
          title="Ingresos acumulados"
          amount={totals.monthlyIncome}
          icon={<FaArrowTrendUp />}
          variant="success"
        />
        <StatCard
          title="Gastos acumulados"
          amount={totals.monthlyExpenses}
          icon={<FaArrowTrendDown />}
          variant="danger"
        />
        <StatCard
          title="Balance total"
          amount={totals.monthlySavings}
          icon={<FaPiggyBank />}
          variant="warning"
        />
      </section>

      <section className="charts-grid">
        <IncomeExpenseChart data={monthlyData} />
        <CategoryChart data={categoryData} />
      </section>

      <RecentTransactions transactions={recentTransactions} />
    </div>
  );
}

export default Home;