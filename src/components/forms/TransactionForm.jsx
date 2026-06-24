import { useMemo, useState } from "react";

import Input from "../ui/Input";
import Select from "../ui/Select";
import Button from "../ui/Button";
import { mockCategories } from "../../data/mockCategories";

const CUSTOM_CATEGORY_VALUE = "__custom__";

const initialState = {
  description: "",
  amount: "",
  date: "",
  type: "Gasto",
  category: "",
  customCategory: "",
};

function getInitialFormState(initialData) {
  if (!initialData) return initialState;

  const type = initialData.type || "Gasto";

  const categoriesByType = mockCategories
    .filter((item) => item.type === type)
    .map((item) => item.name);

  const isPredefinedCategory = categoriesByType.includes(initialData.category);

  return {
    description: initialData.description || "",
    amount: initialData.amount ?? "",
    date: initialData.date || "",
    type,
    category: isPredefinedCategory
      ? initialData.category
      : CUSTOM_CATEGORY_VALUE,
    customCategory: isPredefinedCategory ? "" : initialData.category || "",
  };
}

function TransactionForm({
  onSubmitTransaction,
  onClose,
  initialData = null,
  submitLabel = "Guardar movimiento",
}) {
  const [formData, setFormData] = useState(() =>
    getInitialFormState(initialData)
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
      { value: CUSTOM_CATEGORY_VALUE, label: "Otra categoría" },
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
          customCategory: "",
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

    const finalCategory =
      formData.category === CUSTOM_CATEGORY_VALUE
        ? formData.customCategory.trim()
        : formData.category;

    if (!finalCategory) {
      setErrorMessage("Debes seleccionar o escribir una categoría.");
      return;
    }

    if (Number(formData.amount) <= 0) {
      setErrorMessage("El monto debe ser mayor a 0.");
      return;
    }

    setIsSubmitting(true);

    const payload = {
      description: formData.description.trim(),
      amount: Number(formData.amount),
      date: formData.date,
      type: formData.type,
      category: finalCategory,
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

      {formData.category === CUSTOM_CATEGORY_VALUE && (
        <Input
          id="customCategory"
          name="customCategory"
          label="Nueva categoría"
          value={formData.customCategory}
          onChange={handleChange}
          placeholder="Ej. Universidad, Delivery, Pasajes"
          required
          type="text"
        />
      )}

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