import Link from "next/link"

export default function DashboardTable() {
  const rows = Array(10)
    .fill(0)
    .map((_, i) => (
      <tr key={i}>
        <td className="px-6 py-4 whitespace-nowrap text-sm">患者 #{i}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          患者 #{i}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
            Active
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <Link href="/patients/">
            <a className="text-indigo-600 hover:text-indigo-900">View</a>
          </Link>
        </td>
      </tr>
    ))

  return (
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
