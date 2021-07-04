import { useRouter } from "next/router"

import { useUserSignedIn } from "../api/auth"
import Layout from "../components/layout"
import Timestamp from "../components/timestamp"
import DashboardInfo from "../components/dashboard-info"
import DashboardGraph from "../components/dashboard-graph"
import DashboardTable from "../components/dashboard-table"

export default function Dashboard() {
  const router = useRouter()
  const isSignedIn = useUserSignedIn()

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
          <DashboardInfo
            patients={3999}
            warnings={143}
            discharged={582}
            doctors={13}
            trendPatients={5}
            trendWarnings={10}
            trendDischarged={-84}
            trendDoctors={2}
          />
          <div className="mt-4 flex flex-col md:flex-row space-x-4">
            <div className="bg-white flex-1 h-96 rounded-lg shadow no-scrollbar overflow-y-scroll">
              <DashboardTable />
            </div>
            <div className="bg-white flex-1 h-96 rounded-lg shadow p-6 flex items-center">
              <DashboardGraph />
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}
