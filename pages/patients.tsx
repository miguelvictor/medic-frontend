import { useRouter } from "next/router"

import { useUserSignedIn } from "../api/auth"
import Layout from "../components/layout"

export default function Patients() {
  const router = useRouter()
  const isSignedIn = useUserSignedIn()

  if (typeof window !== "undefined" && !isSignedIn) {
    router.push("signin")
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
          {/* Replace with your content */}
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96" />
          </div>
          {/* /End replace */}
        </div>
      </main>
    </Layout>
  )
}
