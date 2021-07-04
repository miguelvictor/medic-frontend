import { useRouter } from "next/router"

import { useDashboardGraph, useDashboardInfo, useUserSignedIn } from "../api"
import Layout from "../components/layout"
import Timestamp from "../components/timestamp"
import DashboardInfo from "../components/dashboard-info"
import DashboardGraph from "../components/dashboard-graph"
import DashboardTable from "../components/dashboard-table"

export default function Dashboard() {
  const router = useRouter()
  const isSignedIn = useUserSignedIn()
  const [info, isInfoLoading] = useDashboardInfo()
  const [graphData, isGraphLoading] = useDashboardGraph()

  if (typeof window !== "undefined" && !isSignedIn) {
    router.push("/signin")
    return null
  }

  return (
    <Layout>
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <Timestamp />
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 px-6 lg:py-8 lg:px-8">
          <DashboardInfo info={info} isLoading={isInfoLoading} />
          <div className="mt-4 flex flex-col md:flex-row space-x-4">
            <div className="bg-white flex-1 h-96 rounded-lg shadow no-scrollbar overflow-y-scroll">
              <DashboardTable />
            </div>
            <div className="bg-white flex-1 h-96 rounded-lg shadow p-6 flex flex-col">
              <h1 className="font-bold text-xl mb-2">人数统计图</h1>
              <DashboardGraph data={graphData} isLoading={isGraphLoading} />
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}
