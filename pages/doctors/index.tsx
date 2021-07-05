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
    <Layout title="医生记录">
      <DoctorsTable doctors={doctors} />
    </Layout>
  )
}
