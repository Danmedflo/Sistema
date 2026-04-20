import { useEffect, useMemo, useState } from "react";
import MonthlyTrendChart from "../../components/charts/MonthlyTrendChart";
import BalanceChart from "../../components/charts/BalanceChart";
import { getTransactions } from "../../services/transactionService";
import useAuth from "../../hooks/useAuth";
import {
  groupTransactionsByMonth,
  groupExpensesByCategory,
} from "../../utils/chartHelpers";
import { formatCurrency } from "../../utils/formatCurrency";

function Reports() {
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
        setPageError("No se pudieron cargar los reportes.");
        setIsLoading(false);
        return;
      }

      setTransactions(data || []);
      setIsLoading(false);
    };

    fetchTransactions();
  }, [user?.id]);

  const monthlyData = useMemo(() => {
    return groupTransactionsByMonth(transactions);
  }, [transactions]);

  const categoryData = useMemo(() => {
    return groupExpensesByCategory(transactions);
  }, [transactions]);

  const totals = useMemo(() => {
    const income = transactions
      .filter((item) => item.type === "Ingreso")
      .reduce((acc, item) => acc + Number(item.amount), 0);

    const expense = transactions
      .filter((item) => item.type === "Gasto")
      .reduce((acc, item) => acc + Number(item.amount), 0);

    return {
      income,
      expense,
      balance: income - expense,
    };
  }, [transactions]);

  return (
    <div className="reports-page">
      <div className="page-header">
        <div>
          <h2>Reportes</h2>
          <p>Visualiza el comportamiento real de tus finanzas.</p>
        </div>
      </div>

      {isLoading ? (
        <section className="panel-card">
          <p>Cargando reportes...</p>
        </section>
      ) : pageError ? (
        <section className="panel-card">
          <p className="form-error-message">{pageError}</p>
        </section>
      ) : (
        <>
          <section className="stats-grid">
            <article className="stat-card">
              <div className="stat-card-top">
                <span className="stat-card-title">Ingresos acumulados</span>
              </div>
              <h3 className="stat-card-amount">
                {formatCurrency(totals.income)}
              </h3>
            </article>

            <article className="stat-card">
              <div className="stat-card-top">
                <span className="stat-card-title">Gastos acumulados</span>
              </div>
              <h3 className="stat-card-amount">
                {formatCurrency(totals.expense)}
              </h3>
            </article>

            <article className="stat-card">
              <div className="stat-card-top">
                <span className="stat-card-title">Balance total</span>
              </div>
              <h3 className="stat-card-amount">
                {formatCurrency(totals.balance)}
              </h3>
            </article>
          </section>

          <section className="charts-grid">
            <MonthlyTrendChart data={monthlyData} />
            <BalanceChart data={categoryData} />
          </section>
        </>
      )}
    </div>
  );
}

export default Reports;