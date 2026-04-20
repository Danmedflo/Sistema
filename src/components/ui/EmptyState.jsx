import { FaInbox } from "react-icons/fa6";

function EmptyState({
  title = "No hay datos disponibles",
  description = "Cuando agregues información, aparecerá aquí.",
}) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        <FaInbox />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default EmptyState;