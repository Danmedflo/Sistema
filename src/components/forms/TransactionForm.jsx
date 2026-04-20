import { useMemo, useState } from "react";
import Input from "../ui/Input";
import Select from "../ui/Select";
import Button from "../ui/Button";
import { mockCategories } from "../../data/mockCategories";

function TransactionForm({ onAddTransaction, onClose }) {
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    date: "",
    type: "Gasto",
    category: "",
  });

  const categoryOptions = useMemo(() => {
    const filtered = mockCategories.filter(
      (item) => item.type === formData.type
    );

    return [
      { value: "", label: "Selecciona una categoría" },
      ...filtered.map((item) => ({
        value: item.name,
        label: item.name,
      })),
    ];
  }, [formData.type]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      if (name === "type") {
        return {
          ...prev,
          type: value,
          category: "",
        };
      }

      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTransaction = {
      id: Date.now(),
      description: formData.description,
      amount: Number(formData.amount),
      date: formData.date,
      type: formData.type,
      category: formData.category,
    };

    onAddTransaction(newTransaction);

    setFormData({
      description: "",
      amount: "",
      date: "",
      type: "Gasto",
      category: "",
    });

    onClose();
  };

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <Input
        id="description"
        label="Descripción"
        value={formData.description}
        onChange={handleChange}
        placeholder="Ej. Pago de internet"
        required
        type="text"
        name="description"
      />

      <Input
        id="amount"
        label="Monto"
        type="number"
        value={formData.amount}
        onChange={handleChange}
        placeholder="Ej. 150"
        required
        name="amount"
      />

      <Input
        id="date"
        label="Fecha"
        type="date"
        value={formData.date}
        onChange={handleChange}
        required
        name="date"
      />

      <Select
        id="type"
        label="Tipo"
        value={formData.type}
        onChange={handleChange}
        required
        options={[
          { value: "Gasto", label: "Gasto" },
          { value: "Ingreso", label: "Ingreso" },
        ]}
        name="type"
      />

      <Select
        id="category"
        label="Categoría"
        value={formData.category}
        onChange={handleChange}
        required
        options={categoryOptions}
        name="category"
      />

      <div className="transaction-form-actions">
        <Button type="button" variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit">Guardar movimiento</Button>
      </div>
    </form>
  );
}

export default TransactionForm;