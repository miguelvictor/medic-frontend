import Link from "next/link"

import { DashboardPatientsResponse } from "../api"

export interface DashboardTableProps {
  isLoading: boolean
  patients: DashboardPatientsResponse | null
}

export default function DashboardTable({
  isLoading,
  patients,
}: DashboardTableProps) {
  if (isLoading) {
    return (
      <div className="p-6 h-full flex flex-col">
        <h1 className="font-bold text-xl mb-2">生理处于危险时刻的患者</h1>
        <div className="flex flex-col justify-center h-full mx-auto my-8 space-y-4">
          <div className="animate-pulse h-4 w-32 bg-gray-400 rounded"></div>
          <div className="h-1"></div>
          <div className="animate-pulse h-4 w-64 bg-gray-400 rounded"></div>
          <div className="animate-pulse h-4 w-52 bg-gray-400 rounded"></div>
          <div className="animate-pulse h-4 w-52 bg-gray-400 rounded"></div>
        </div>
      </div>
    )
  }

  const rows = patients ? (
    patients.map((patient) => (
      <tr key={patient.subjectId}>
        <td className="px-6 py-3 whitespace-nowrap text-sm">{patient.name}</td>
        <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">
          #{patient.wardId}
        </td>
        <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">
          {patient.duration}
        </td>
        <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">
          {patient.isHighRisk ? (
            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
              有
            </span>
          ) : (
            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
              无
            </span>
          )}
        </td>
        <td className="px-6 py-3 whitespace-nowrap text-right text-sm font-medium">
          <Link href={`/patients/${patient.subjectId}`}>
            <a className="text-indigo-600 hover:text-indigo-900">View</a>
          </Link>
        </td>
      </tr>
    ))
  ) : (
    <p>no patients</p>
  )

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            患者
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            病案号
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            住院天数
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
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
  )
}
