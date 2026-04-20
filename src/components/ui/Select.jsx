function Select({
  label,
  id,
  name,
  value,
  onChange,
  options = [],
  required = false,
}) {
  return (
    <div className="custom-field">
      {label && <label htmlFor={id}>{label}</label>}
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="custom-input"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;