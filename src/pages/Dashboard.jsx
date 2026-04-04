import { useQuery } from '@tanstack/react-query';
import { getTransacciones } from '../hooks/useTransacciones';

export default function Dashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ['transacciones'],
    queryFn: getTransacciones,
  });

  if (isLoading) return <p>Cargando...</p>;

  return (
    <div>
      <h2>Mis Transacciones</h2>
      {data.map((t) => (
        <div key={t.id}>
          <p>{t.descripcion}</p>
          <p>S/ {t.monto}</p>
        </div>
      ))}
    </div>
  );
}