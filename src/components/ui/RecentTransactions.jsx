import { formatCurrency } from "../../utils/formatCurrency";
import EmptyState from "./EmptyState";

function RecentTransactions({ transactions = [] }) {
  return (
    <section className="panel-card">
      <div className="panel-card-header">
        <h3>Últimas transacciones</h3>
      </div>

      {transactions.length === 0 ? (
        <EmptyState
          title="Aún no tienes transacciones"
          description="Registra tus primeros movimientos y aquí verás los más recientes."
        />
      ) : (
        <div className="transactions-table-wrapper">
          <table className="transactions-table">
            <thead>
              <tr>
                <th>Descripción</th>
                <th>Categoría</th>
                <th>Fecha</th>
                <th>Tipo</th>
                <th style={{ textAlign: "right" }}>Monto</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((item) => (
                <tr key={item.id}>
                  <td>{item.description}</td>
                  <td>{item.category}</td>
                  <td>{item.date}</td>
                  <td>
                    <span
                      className={
                        item.type === "Ingreso"
                          ? "badge badge-income"
                          : "badge badge-expense"
                      }
                    >
                      {item.type}
                    </span>
                  </td>
                  <td style={{ textAlign: "right", fontWeight: 700 }}>
                    {formatCurrency(item.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default RecentTransactions;