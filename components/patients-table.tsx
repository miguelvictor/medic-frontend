import Link from "next/link"
import { Patient } from "../api"

export interface PatientsTableProps {
  patients: Patient[]
}

export default function PatientsTable({ patients }: PatientsTableProps) {
  const rows = patients.map((patient, index) => {
    const rowClasses = index % 2 == 0 ? "" : "bg-gray-50"

    return (
      <tr key={patient.subjectId} className={rowClasses}>
        <td className="px-6 py-3 whitespace-nowrap text-sm">{patient.name}</td>
        <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">
          {patient.nationalId}
        </td>
        <td className="px-6 py-3 whitespace-nowrap text-sm">
          <div className="text-sm text-gray-900">
            {patient.age}岁 · {patient.ethnicity} · {patient.gender}
          </div>
        </td>
        <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-center">
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
            有
          </span>
        </td>
        <td className="px-6 py-3 whitespace-nowrap text-right text-sm font-medium">
          <Link href={`/patients/${patient.subjectId}`}>
            <a className="text-indigo-600 hover:text-indigo-900">View</a>
          </Link>
        </td>
      </tr>
    )
  })

  return (
    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              姓名
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              身份证号
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              基本信息
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs text-center font-medium text-gray-500 uppercase tracking-wider"
            >
              有无生命危险
            </th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">{rows}</tbody>
      </table>
    </div>
  )
}
