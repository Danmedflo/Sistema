function Loader({ text = "Cargando..." }) {
  return (
    <div className="loader-box">
      <div className="loader-spinner" />
      <p>{text}</p>
    </div>
  );
}

export default Loader;