import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

function IncomeExpenseChart() {
  const data = {
    labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
    datasets: [
      {
        label: "Ingresos",
        data: [1800, 2200, 2100, 3200, 2800, 3500],
        borderColor: "#16a34a",
        backgroundColor: "rgba(22, 163, 74, 0.15)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Gastos",
        data: [900, 1200, 1100, 1350, 1400, 1700],
        borderColor: "#dc2626",
        backgroundColor: "rgba(220, 38, 38, 0.12)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <section className="panel-card chart-card">
      <div className="panel-card-header">
        <h3>Ingresos vs gastos</h3>
      </div>
      <div style={{ height: "300px" }}>
        <Line data={data} options={{ ...options, maintainAspectRatio: false }} />
      </div>
    </section>
  );
}

export default IncomeExpenseChart;