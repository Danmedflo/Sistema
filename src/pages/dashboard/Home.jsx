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
import { mockStats } from "../../data/mockStats";

function Home() {
  return (
    <div className="dashboard-home">
      <section className="stats-grid">
        <StatCard
          title="Saldo total"
          amount={mockStats.totalBalance}
          icon={<FaWallet />}
          variant="primary"
        />
        <StatCard
          title="Ingresos del mes"
          amount={mockStats.monthlyIncome}
          icon={<FaArrowTrendUp />}
          variant="success"
        />
        <StatCard
          title="Gastos del mes"
          amount={mockStats.monthlyExpenses}
          icon={<FaArrowTrendDown />}
          variant="danger"
        />
        <StatCard
          title="Ahorro del mes"
          amount={mockStats.monthlySavings}
          icon={<FaPiggyBank />}
          variant="warning"
        />
      </section>

      <section className="charts-grid">
        <IncomeExpenseChart />
        <CategoryChart />
      </section>

      <RecentTransactions />
    </div>
  );
}

export default Home;