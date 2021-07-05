import { useState, useEffect } from "react"
import { useRouter } from "next/router"

import { useAuthUpdater } from "./auth"
import { appAxios, handleAxiosError } from "./axios"
import { UnauthorizedError } from "./errors"
import {
  DashboardInfoResponse,
  DashboardGraphResponse,
  DashboardPatientsResponse,
} from "./responses"

async function getPredictorResponse<T>(url: string): Promise<T> {
  try {
    const response = await appAxios.get(url)
    return response.data as T
  } catch (error) {
    throw handleAxiosError(error)
  }
}

export function usePredictors<T>(
  apiFunc: () => Promise<T>
): [T | null, boolean] {
  const router = useRouter()
  const updateAuth = useAuthUpdater()
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    ;(async () => {
      try {
        setData(await apiFunc())
      } catch (e) {
        console.error(e)

        if (e instanceof UnauthorizedError) {
          updateAuth(null, null)
          router.push("/signout")
        }
      } finally {
        setIsLoading(false)
      }
    })()
  }, [setIsLoading, setData, updateAuth, router])

  return [data, isLoading]
}

export function useDashboardInfo() {
  return usePredictors(() =>
    getPredictorResponse<DashboardInfoResponse>("/dashboard-info/")
  )
}

export function useDashboardGraph() {
  return usePredictors(() =>
    getPredictorResponse<DashboardGraphResponse>("/dashboard-graph/")
  )
}

export function useDashboardPatients() {
  return usePredictors(() =>
    getPredictorResponse<DashboardPatientsResponse>("/dashboard-patients/")
  )
}
