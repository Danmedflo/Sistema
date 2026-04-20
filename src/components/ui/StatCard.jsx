import { formatCurrency } from "../../utils/formatCurrency";

function StatCard({ title, amount, icon, variant = "default" }) {
  return (
    <article className={`stat-card stat-card--${variant}`}>
      <div className="stat-card-top">
        <span className="stat-card-title">{title}</span>
        <span className="stat-card-icon">{icon}</span>
      </div>

      <h3 className="stat-card-amount">{formatCurrency(amount)}</h3>
    </article>
  );
}

export default StatCard;