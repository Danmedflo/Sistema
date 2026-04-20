function Button({
  children,
  type = "button",
  onClick,
  variant = "primary",
  fullWidth = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`custom-btn custom-btn--${variant} ${
        fullWidth ? "custom-btn--full" : ""
      }`}
    >
      {children}
    </button>
  );
}

export default Button;