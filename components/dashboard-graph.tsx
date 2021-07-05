import { Line } from "react-chartjs-2"

import { DashboardGraphResponse } from "../api"

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
  plugins: {
    legend: {
      position: "bottom",
    },
  },
}
const labels = Array(14)
  .fill(0)
  .map((_, i) => i + 1)
const datasetOptions = {
  fill: false,
  cubicInterpolationMode: "monotone",
  tension: 0.4,
}
const dataset1Options = {
  ...datasetOptions,
  label: "住院人数",
  backgroundColor: "rgb(255, 99, 132)",
  borderColor: "rgba(255, 99, 132, 0.2)",
}
const dataset2Options = {
  ...datasetOptions,
  label: "入住 ICU 人数",
  backgroundColor: "rgb(4, 120, 87)",
  borderColor: "rgba(4, 120, 87, 0.2)",
}
const dataset3Options = {
  ...datasetOptions,
  label: "出院人数",
  backgroundColor: "rgb(59, 130, 246)",
  borderColor: "rgba(59, 130, 246, 0.2)",
}

export interface DashboardGraphProps {
  isLoading: boolean
  data: DashboardGraphResponse | null
}

export default function DashboardGraph({
  isLoading,
  data: dataProp,
}: DashboardGraphProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col justify-center h-full mx-auto my-8 space-y-4">
        <div className="animate-pulse h-4 w-32 bg-gray-400 rounded"></div>
        <div className="h-1"></div>
        <div className="animate-pulse h-4 w-64 bg-gray-400 rounded"></div>
        <div className="animate-pulse h-4 w-52 bg-gray-400 rounded"></div>
        <div className="animate-pulse h-4 w-52 bg-gray-400 rounded"></div>
      </div>
    )
  }

  const data = {
    labels,
    datasets: [
      {
        ...dataset1Options,
        data: dataProp?.patients,
      },
      {
        ...dataset2Options,
        data: dataProp?.icuPatients,
      },
      {
        ...dataset3Options,
        data: dataProp?.dischargedPatients,
      },
    ],
  }

  return <Line type="line" data={data} options={options} />
}
