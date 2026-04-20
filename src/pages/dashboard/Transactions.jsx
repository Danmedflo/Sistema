import { useMemo, useState } from "react";
import { FaPlus, FaFilter } from "react-icons/fa6";
import Modal from "../../components/ui/Modal";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import TransactionForm from "../../components/forms/TransactionForm";
import { mockTransactions as initialTransactions } from "../../data/mockTransactions";
import { formatCurrency } from "../../utils/formatCurrency";

function Transactions() {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [filters, setFilters] = useState({
    search: "",
    type: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const filteredTransactions = useMemo(() => {
    return transactions.filter((item) => {
      const matchSearch =
        item.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.category.toLowerCase().includes(filters.search.toLowerCase());

      const matchType = filters.type ? item.type === filters.type : true;

      return matchSearch && matchType;
    });
  }, [transactions, filters]);

  const handleAddTransaction = (newTransaction) => {
    setTransactions((prev) => [newTransaction, ...prev]);
  };

  return (
    <div className="transactions-page">
      <div className="page-header">
        <div>
          <h2>Transacciones</h2>
          <p>Gestiona tus ingresos y gastos registrados.</p>
        </div>

        <Button onClick={() => setIsModalOpen(true)}>
          <FaPlus />
          Agregar movimiento
        </Button>
      </div>

      <section className="panel-card filters-card">
        <div className="panel-card-header">
          <h3>
            <FaFilter />
            Filtros
          </h3>
        </div>

        <div className="filters-grid">
          <Input
            id="search"
            name="search"
            label="Buscar"
            value={filters.search}
            onChange={handleFilterChange}
            placeholder="Buscar por descripción o categoría"
          />

          <Select
            id="typeFilter"
            name="type"
            label="Tipo"
            value={filters.type}
            onChange={handleFilterChange}
            options={[
              { value: "", label: "Todos" },
              { value: "Ingreso", label: "Ingreso" },
              { value: "Gasto", label: "Gasto" },
            ]}
          />
        </div>
      </section>

      <section className="panel-card">
        <div className="panel-card-header">
          <h3>Listado de movimientos</h3>
          <span className="table-count">
            {filteredTransactions.length} registros
          </span>
        </div>

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
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((item) => (
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
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="empty-row">
                    No se encontraron movimientos con esos filtros.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <Modal
        isOpen={isModalOpen}
        title="Agregar nueva transacción"
        onClose={() => setIsModalOpen(false)}
      >
        <TransactionForm
          onAddTransaction={handleAddTransaction}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}

export default Transactions;