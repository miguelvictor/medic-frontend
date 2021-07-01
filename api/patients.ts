import { useState, useEffect } from "react"
import { useRouter } from "next/router"

import { useAuthUpdater } from "./auth"
import { appAxios, handleAxiosError } from "./axios"
import { UnauthorizedError } from "./errors"
import { Patient, ListObjectsResponse } from "./responses"

export async function getPatients(page?: number): Promise<Patient[]> {
  try {
    const params = { page: page ?? 1 }
    const response = await appAxios.get(`/patients/`, { params })
    const data = response.data as ListObjectsResponse<Patient>

    return data.results
  } catch (error) {
    throw handleAxiosError(error)
  }
}

export async function getPatient(id: string): Promise<Patient> {
  try {
    const response = await appAxios.get(`/patients/${id}/`)

    return response.data as Patient
  } catch (error) {
    throw handleAxiosError(error)
  }
}

export function usePatientInfo(
  id: string | string[] | undefined
): [Patient | null, boolean] {
  const router = useRouter()
  const updateAuth = useAuthUpdater()
  const [patient, setPatient] = useState<Patient | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    ;(async () => {
      if (typeof id === "undefined" || id instanceof Array) return

      try {
        setPatient(await getPatient(id))
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
  }, [id, updateAuth, setPatient])

  return [patient, isLoading]
}

export function usePatientInfos(): [Patient[], boolean] {
  const router = useRouter()
  const updateAuth = useAuthUpdater()
  const [patients, setPatients] = useState<Patient[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    ;(async () => {
      try {
        setPatients(await getPatients())
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
  }, [updateAuth, setPatients])

  return [patients, isLoading]
}
