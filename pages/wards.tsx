import { useRouter } from "next/router"

import { useUserSignedIn } from "../api/auth"
import Layout from "../components/layout"

export default function Patients() {
  const router = useRouter()
  const isSignedIn = useUserSignedIn()

  if (typeof window !== "undefined" && !isSignedIn) {
    router.push("/signin")
    return null
  }

  return (
    <Layout title="病房记录">
      <div className="border-4 border-dashed border-gray-300 rounded-lg h-96" />
    </Layout>
  )
}
