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
    <Layout title="患者记录">
      <PatientsTable patients={patients} />
    </Layout>
  )
}
