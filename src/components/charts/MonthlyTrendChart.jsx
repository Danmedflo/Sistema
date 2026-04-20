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

function MonthlyTrendChart({ data = [] }) {
  const chartData = {
    labels: data.map((item) => item.month),
    datasets: [
      {
        label: "Ingresos",
        data: data.map((item) => item.income),
        borderColor: "#16a34a",
        backgroundColor: "rgba(22, 163, 74, 0.12)",
        fill: true,
        tension: 0.35,
      },
      {
        label: "Gastos",
        data: data.map((item) => item.expense),
        borderColor: "#dc2626",
        backgroundColor: "rgba(220, 38, 38, 0.12)",
        fill: true,
        tension: 0.35,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <section className="panel-card chart-card">
      <div className="panel-card-header">
        <h3>Tendencia mensual</h3>
      </div>

      <div style={{ height: "300px" }}>
        <Line data={chartData} options={options} />
      </div>
    </section>
  );
}

export default MonthlyTrendChart;