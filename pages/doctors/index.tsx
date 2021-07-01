import { useRouter } from "next/router"

import { useDoctorInfos, useUserSignedIn } from "../../api"
import Layout from "../../components/layout"
import DoctorsTable from "../../components/doctors-table"

export default function DoctorList() {
  const router = useRouter()
  const isSignedIn = useUserSignedIn()
  const [doctors, isLoading] = useDoctorInfos()

  if (typeof window !== "undefined" && !isSignedIn) {
    router.push("/signin")
    return null
  }

  return (
    <Layout>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">医生</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <DoctorsTable doctors={doctors} />
        </div>
      </main>
    </Layout>
  )
}
