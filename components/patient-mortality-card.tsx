import { Pie } from "react-chartjs-2"

const data = {
  labels: ["死亡率", "存活率"],
  datasets: [
    {
      label: "My First Dataset",
      data: [13, 87],
      backgroundColor: ["rgb(255, 205, 86)", "rgb(255, 99, 132)"],
      hoverOffset: 4,
    },
  ],
}
const options = {
  plugins: {
    legend: {
      position: "left",
    },
  },
}

export default function PatientMortalityCard() {
  return (
    <div className="bg-white shadow rounded-lg p-6" style={{ height: "293px" }}>
      <h1 className="font-bold text-xl mb-2">死亡率预测</h1>
      <div className="w-64">
        <Pie type="pie" data={data} options={options} />
      </div>
    </div>
  )
}
