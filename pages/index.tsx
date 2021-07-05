import { useRouter } from "next/router"

import {
  useDashboardInfo,
  useDashboardGraph,
  useDashboardPatients,
  useUserSignedIn,
} from "../api"
import Layout from "../components/layout"
import DashboardInfo from "../components/dashboard-info"
import DashboardGraph from "../components/dashboard-graph"
import DashboardTable from "../components/dashboard-table"

export default function Dashboard() {
  const router = useRouter()
  const isSignedIn = useUserSignedIn()
  const [info, isInfoLoading] = useDashboardInfo()
  const [graphData, isGraphLoading] = useDashboardGraph()
  const [patients, isPatientsLoading] = useDashboardPatients()

  if (typeof window !== "undefined" && !isSignedIn) {
    router.push("/signin")
    return null
  }

  return (
    <Layout title="Dashboard">
      <DashboardInfo info={info} isLoading={isInfoLoading} />
      <div className="mt-4 flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
        <div className="bg-white flex-1 h-96 rounded-lg shadow no-scrollbar overflow-y-scroll">
          <DashboardTable patients={patients} isLoading={isPatientsLoading} />
        </div>
        <div className="bg-white flex-1 h-96 rounded-lg shadow p-6 flex flex-col">
          <h1 className="font-bold text-xl mb-2">人数统计图</h1>
          <DashboardGraph data={graphData} isLoading={isGraphLoading} />
        </div>
      </div>
    </Layout>
  )
}
