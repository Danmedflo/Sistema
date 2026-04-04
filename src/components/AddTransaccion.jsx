import { useState } from 'react';
import { addTransaccion } from '../hooks/useTransacciones';

export default function AddTransaccion() {
  const [descripcion, setDescripcion] = useState('');
  const [monto, setMonto] = useState('');

  const handleSubmit = async () => {
    await addTransaccion({
      descripcion,
      monto: parseFloat(monto),
      tipo: 'gasto',
    });

    window.location.reload();
  };

  return (
    <div>
      <h3>Nuevo gasto</h3>
      <input placeholder="Descripción" onChange={(e) => setDescripcion(e.target.value)} />
      <input placeholder="Monto" onChange={(e) => setMonto(e.target.value)} />
      <button onClick={handleSubmit}>Guardar</button>
    </div>
  );
}