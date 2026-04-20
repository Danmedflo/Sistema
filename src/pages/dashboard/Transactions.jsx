import { useEffect, useMemo, useState } from "react";
import { FaPlus, FaFilter, FaPenToSquare, FaTrash } from "react-icons/fa6";
import Modal from "../../components/ui/Modal";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import TransactionForm from "../../components/forms/TransactionForm";
import Toast from "../../components/ui/Toast";
import { formatCurrency } from "../../utils/formatCurrency";
import {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from "../../services/transactionService";
import useAuth from "../../hooks/useAuth";

function Transactions() {
  const { user } = useAuth();

  const [transactions, setTransactions] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [deletingTransaction, setDeletingTransaction] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [pageError, setPageError] = useState("");

  const [filters, setFilters] = useState({
    search: "",
    type: "",
  });

  const [toast, setToast] = useState({
    message: "",
    type: "success",
  });

  const showToast = (message, type = "success") => {
    setToast({ message, type });

    setTimeout(() => {
      setToast({ message: "", type: "success" });
    }, 2500);
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!user?.id) return;

      setIsLoading(true);
      setPageError("");

      const { data, error } = await getTransactions(user.id);

      if (error) {
        setPageError("No se pudieron cargar las transacciones.");
        setIsLoading(false);
        return;
      }

      setTransactions(data || []);
      setIsLoading(false);
    };

    fetchTransactions();
  }, [user?.id]);

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

  const handleCreateTransaction = async (newTransaction) => {
    const payload = {
      ...newTransaction,
      user_id: user.id,
    };

    const { data, error } = await createTransaction(payload);

    if (error) {
      showToast("Error al crear la transacción", "error");
      return {
        success: false,
        message: error.message || "No se pudo guardar la transacción.",
      };
    }

    if (data?.length) {
      setTransactions((prev) => [data[0], ...prev]);
      showToast("Transacción creada correctamente");
    }

    return { success: true };
  };

  const handleEditTransaction = async (updatedValues) => {
    if (!editingTransaction) {
      showToast("No se encontró la transacción a editar", "error");
      return {
        success: false,
        message: "No se encontró la transacción a editar.",
      };
    }

    const { data, error } = await updateTransaction(
      editingTransaction.id,
      updatedValues,
      user.id
    );

    if (error) {
      showToast("Error al actualizar la transacción", "error");
      return {
        success: false,
        message: error.message || "No se pudo actualizar la transacción.",
      };
    }

    if (data?.length) {
      setTransactions((prev) =>
        prev.map((item) => (item.id === editingTransaction.id ? data[0] : item))
      );
      showToast("Transacción actualizada correctamente");
    }

    setEditingTransaction(null);
    return { success: true };
  };

  const handleDeleteTransaction = async () => {
    if (!deletingTransaction) return;

    setIsDeleting(true);

    const { error } = await deleteTransaction(deletingTransaction.id, user.id);

    if (!error) {
      setTransactions((prev) =>
        prev.filter((item) => item.id !== deletingTransaction.id)
      );
      setDeletingTransaction(null);
      showToast("Transacción eliminada correctamente");
    } else {
      showToast(error.message || "Error al eliminar la transacción", "error");
    }

    setIsDeleting(false);
  };

  return (
    <>
      <Toast message={toast.message} type={toast.type} />

      <div className="transactions-page">
        <div className="page-header">
          <div>
            <h2>Transacciones</h2>
            <p>Gestiona tus ingresos y gastos registrados.</p>
          </div>

          <Button onClick={() => setIsCreateModalOpen(true)}>
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

          {isLoading ? (
            <div className="status-inline">
              <div className="status-loader status-loader--sm"></div>
              <p>Cargando transacciones...</p>
            </div>
          ) : pageError ? (
            <section className="status-card status-card--error">
              <h3>No se pudieron cargar las transacciones</h3>
              <p className="form-error-message">{pageError}</p>
            </section>
          ) : filteredTransactions.length > 0 ? (
            <div className="transactions-table-wrapper">
              <table className="transactions-table">
                <thead>
                  <tr>
                    <th>Descripción</th>
                    <th>Categoría</th>
                    <th>Fecha</th>
                    <th>Tipo</th>
                    <th style={{ textAlign: "right" }}>Monto</th>
                    <th style={{ textAlign: "center" }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((item) => (
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
                      <td>
                        <div className="table-actions">
                          <button
                            className="icon-action-btn"
                            onClick={() => setEditingTransaction(item)}
                            title="Editar"
                          >
                            <FaPenToSquare />
                          </button>

                          <button
                            className="icon-action-btn icon-action-btn--danger"
                            onClick={() => setDeletingTransaction(item)}
                            title="Eliminar"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <section className="status-card">
              <h3>No se encontraron movimientos</h3>
              <p>
                Prueba cambiando los filtros o registra una nueva transacción
                para empezar.
              </p>
            </section>
          )}
        </section>

        <Modal
          isOpen={isCreateModalOpen}
          title="Agregar nueva transacción"
          onClose={() => setIsCreateModalOpen(false)}
        >
          <TransactionForm
            onSubmitTransaction={handleCreateTransaction}
            onClose={() => setIsCreateModalOpen(false)}
            submitLabel="Guardar movimiento"
          />
        </Modal>

        <Modal
          isOpen={!!editingTransaction}
          title="Editar transacción"
          onClose={() => setEditingTransaction(null)}
        >
          <TransactionForm
            onSubmitTransaction={handleEditTransaction}
            onClose={() => setEditingTransaction(null)}
            initialData={editingTransaction}
            submitLabel="Guardar cambios"
          />
        </Modal>

        <Modal
          isOpen={!!deletingTransaction}
          title="Eliminar transacción"
          onClose={() => setDeletingTransaction(null)}
        >
          <div className="delete-confirmation">
            <p>
              ¿Seguro que quieres eliminar la transacción{" "}
              <strong>{deletingTransaction?.description}</strong>?
            </p>

            <div className="transaction-form-actions">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setDeletingTransaction(null)}
              >
                Cancelar
              </Button>

              <Button type="button" onClick={handleDeleteTransaction}>
                {isDeleting ? "Eliminando..." : "Sí, eliminar"}
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
}

export default Transactions;