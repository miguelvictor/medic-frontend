import Link from "next/link"
import { Patient } from "../api"

export interface PatientsTableProps {
  patients: Patient[]
}

export default function PatientsTable({ patients }: PatientsTableProps) {
  const rows = patients.map((patient) => (
    <tr key={patient.subjectId}>
      <td className="px-6 py-4 whitespace-nowrap text-sm">{patient.name}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {patient.nationalId}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <div className="text-sm text-gray-900">
          {patient.age}岁 · {patient.ethnicity} · {patient.gender}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {patient.contactNo ?? "-"}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          Active
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <Link href={`/patients/${patient.subjectId}`}>
          <a className="text-indigo-600 hover:text-indigo-900">View</a>
        </Link>
      </td>
    </tr>
  ))

  return (
    <div className="flex flex-col">
      <div className="my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
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
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    联系方式
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
              <tbody className="bg-white divide-y divide-gray-200">
                {rows}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
