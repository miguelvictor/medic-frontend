import { useRouter } from "next/router"

import { usePatientInfo, useUserSignedIn } from "../../api"
import Layout from "../../components/layout"
import PatientInfoCard from "../../components/patient-info-card"
import PatientMortalityCard from "../../components/patient-mortality-card"
import PatientPredictorsTabs from "../../components/patient-predictors-tabs"

export default function PatientDetails() {
  const router = useRouter()
  const isSignedIn = useUserSignedIn()
  const { id } = router.query
  const [patient, isLoading] = usePatientInfo(id)

  if (typeof window !== "undefined" && !isSignedIn) {
    router.push("/signin")
    return null
  }

  return (
    <Layout title={`患者 #${id} 信息`}>
      <div className="flex flex-col justify-stretch md:flex-row space-y-4 md:space-x-4 md:space-y-0">
        <div className="flex-grow">
          <PatientInfoCard patient={patient} isLoading={isLoading} />
        </div>
        <div className="flex-grow-0">
          <PatientMortalityCard />
        </div>
      </div>
      <div className="bg-white mt-4 shadow rounded-lg p-6">
        <PatientPredictorsTabs />
      </div>
    </Layout>
  )
}
