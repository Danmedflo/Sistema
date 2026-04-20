import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function CategoryChart({ data = [] }) {
  const chartData = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        label: "Gastos por categoría",
        data: data.map((item) => item.value),
        backgroundColor: [
          "#2563eb",
          "#16a34a",
          "#f59e0b",
          "#dc2626",
          "#8b5cf6",
          "#14b8a6",
          "#f97316",
        ],
        borderWidth: 0,
        cutout: "65%",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#334155",
          font: {
            size: 12,
            weight: "600",
          },
          boxWidth: 14,
          padding: 14,
        },
      },
    },
  };

  return (
    <section className="panel-card chart-card">
      <div className="panel-card-header">
        <h3>Gastos por categoría</h3>
      </div>

      <div style={{ height: "280px" }}>
        <Doughnut data={chartData} options={options} />
      </div>
    </section>
  );
}

export default CategoryChart;