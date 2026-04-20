import { useEffect, useMemo, useState } from "react";
import Input from "../ui/Input";
import Select from "../ui/Select";
import Button from "../ui/Button";
import { mockCategories } from "../../data/mockCategories";

const initialState = {
  description: "",
  amount: "",
  date: "",
  type: "Gasto",
  category: "",
};

function TransactionForm({
  onSubmitTransaction,
  onClose,
  initialData = null,
  submitLabel = "Guardar movimiento",
}) {
  const [formData, setFormData] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (initialData) {
      setFormData({
        description: initialData.description || "",
        amount: initialData.amount ?? "",
        date: initialData.date || "",
        type: initialData.type || "Gasto",
        category: initialData.category || "",
      });
    } else {
      setFormData(initialState);
    }
  }, [initialData]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    const payload = {
      description: formData.description.trim(),
      amount: Number(formData.amount),
      date: formData.date,
      type: formData.type,
      category: formData.category,
    };

    const result = await onSubmitTransaction(payload);

    if (!result.success) {
      setErrorMessage(result.message || "No se pudo guardar la transacción.");
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(false);
    onClose();
  };

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <Input
        id="description"
        name="description"
        label="Descripción"
        value={formData.description}
        onChange={handleChange}
        placeholder="Ej. Pago de internet"
        required
        type="text"
      />

      <Input
        id="amount"
        name="amount"
        label="Monto"
        type="number"
        value={formData.amount}
        onChange={handleChange}
        placeholder="Ej. 150"
        required
      />

      <Input
        id="date"
        name="date"
        label="Fecha"
        type="date"
        value={formData.date}
        onChange={handleChange}
        required
      />

      <Select
        id="type"
        name="type"
        label="Tipo"
        value={formData.type}
        onChange={handleChange}
        required
        options={[
          { value: "Gasto", label: "Gasto" },
          { value: "Ingreso", label: "Ingreso" },
        ]}
      />

      <Select
        id="category"
        name="category"
        label="Categoría"
        value={formData.category}
        onChange={handleChange}
        required
        options={categoryOptions}
      />

      {errorMessage && <p className="form-error-message">{errorMessage}</p>}

      <div className="transaction-form-actions">
        <Button type="button" variant="secondary" onClick={onClose}>
          Cancelar
        </Button>

        <Button type="submit">
          {isSubmitting ? "Guardando..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}

export default TransactionForm;