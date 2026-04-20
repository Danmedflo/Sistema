import { mockTransactions } from "../../data/mockTransactions";
import { formatCurrency } from "../../utils/formatCurrency";

function RecentTransactions() {
  return (
    <section className="panel-card">
      <div className="panel-card-header">
        <h3>Últimas transacciones</h3>
      </div>

      <div className="transactions-table-wrapper">
        <table className="transactions-table">
          <thead>
            <tr>
              <th>Descripción</th>
              <th>Categoría</th>
              <th>Fecha</th>
              <th>Tipo</th>
              <th>Monto</th>
            </tr>
          </thead>
          <tbody>
            {mockTransactions.map((item) => (
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
                <td>{formatCurrency(item.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default RecentTransactions;