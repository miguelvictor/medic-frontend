import { Line } from "react-chartjs-2"

const data = {
  labels: [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
  ],
  datasets: [
    {
      label: "住院人数",
      data: Array(14)
        .fill(0)
        .map((_) => Math.random() * 100),
      fill: false,
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgba(255, 99, 132, 0.2)",
      cubicInterpolationMode: "monotone",
      tension: 0.4,
    },
    {
      label: "出院人数",
      data: Array(14)
        .fill(0)
        .map((_) => Math.random() * 100),
      fill: false,
      backgroundColor: "rgb(4, 120, 87)",
      borderColor: "rgba(4, 120, 87, 0.2)",
      cubicInterpolationMode: "monotone",
      tension: 0.4,
    },
  ],
}

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
}

export default function DashboardGraph() {
  return <Line data={data} options={options} />
}
