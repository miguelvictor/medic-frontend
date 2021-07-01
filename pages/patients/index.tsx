import { useRouter } from "next/router"

import { usePatientInfos, useUserSignedIn } from "../../api"
import Layout from "../../components/layout"
import PatientsTable from "../../components/patients-table"

export default function Patients() {
  const router = useRouter()
  const isSignedIn = useUserSignedIn()
  const [patients, isLoading] = usePatientInfos()

  if (typeof window !== "undefined" && !isSignedIn) {
    router.push("/signin")
    return null
  }

  return (
    <Layout>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">患者</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <PatientsTable patients={patients} />
        </div>
      </main>
    </Layout>
  )
}
