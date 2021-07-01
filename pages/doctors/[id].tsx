import { useRouter } from "next/router"
import { useDoctorInfo } from "../../api"

import { useUserSignedIn } from "../../api/auth"
import Layout from "../../components/layout"

export default function DoctorDetails() {
  const router = useRouter()
  const isSignedIn = useUserSignedIn()
  const { id } = router.query
  const [doctor, isLoading] = useDoctorInfo(id)

  if (typeof window !== "undefined" && !isSignedIn) {
    router.push("/signin")
    return null
  }

  const doctorName = isLoading ? (
    <div className="animate-pulse h-4 bg-gray-600 rounded w-4/6"></div>
  ) : (
    <h2 className="text-lg leading-6 font-medium text-gray-900">
      {doctor!.name}
      {doctor!.position}
    </h2>
  )
  const workerID = isLoading ? (
    <div className="animate-pulse h-4 bg-gray-600 rounded w-2/6"></div>
  ) : (
    doctor!.workerId
  )
  const nationalID = isLoading ? (
    <div className="animate-pulse h-4 bg-gray-600 rounded w-4/6"></div>
  ) : (
    doctor!.nationalId
  )
  const contactNo = isLoading ? (
    <div className="animate-pulse h-4 bg-gray-600 rounded w-3/6"></div>
  ) : (
    doctor!.contactNo
  )
  const email = isLoading ? (
    <div className="animate-pulse h-4 bg-gray-600 rounded w-3/6"></div>
  ) : (
    doctor!.email
  )
  const gender = isLoading ? (
    <div className="animate-pulse h-4 bg-gray-600 rounded w-1/6"></div>
  ) : doctor!.gender === "M" ? (
    "男性 🚹"
  ) : (
    "女性 🚺"
  )
  const dateOfBirth = isLoading ? (
    <div className="animate-pulse h-4 bg-gray-600 rounded w-3/6"></div>
  ) : (
    doctor?.dateOfBirth
  )

  return (
    <Layout>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">医生 #{id} 信息</h1>
        </div>
      </header>
      <main>
        <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <div className="mt-1 max-w-2xl text-sm text-gray-500 space-y-2">
                {doctorName}
                {workerID}
              </div>
            </div>
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    身份证号（National ID）
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {nationalID}
                  </dd>
                </div>
                <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    邮箱（Email）
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {email}
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    联系方式（Contact No.）
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {contactNo}
                  </dd>
                </div>
                <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    性别（Gender）
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {gender}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}
