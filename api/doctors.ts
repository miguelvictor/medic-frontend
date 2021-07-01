import { useState, useEffect } from "react"
import { useRouter } from "next/router"

import { useAuthUpdater } from "./auth"
import { appAxios, handleAxiosError } from "./axios"
import { UnauthorizedError } from "./errors"
import { Doctor, ListObjectsResponse } from "./responses"

export async function getDoctors(page?: number): Promise<Doctor[]> {
  try {
    const params = { page: page ?? 1 }
    const response = await appAxios.get(`/doctors/`, { params })
    const data = response.data as ListObjectsResponse<Doctor>

    return data.results
  } catch (error) {
    throw handleAxiosError(error)
  }
}

export async function getDoctor(id: string): Promise<Doctor> {
  try {
    const response = await appAxios.get(`/doctors/${id}/`)

    return response.data as Doctor
  } catch (error) {
    throw handleAxiosError(error)
  }
}

export function useDoctorInfo(
  id: string | string[] | undefined
): [Doctor | null, boolean] {
  const router = useRouter()
  const updateAuth = useAuthUpdater()
  const [doctor, setDoctor] = useState<Doctor | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    ;(async () => {
      if (typeof id === "undefined" || id instanceof Array) return

      try {
        setDoctor(await getDoctor(id))
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
  }, [id, updateAuth, setDoctor])

  return [doctor, isLoading]
}

export function useDoctorInfos(): [Doctor[], boolean] {
  const router = useRouter()
  const updateAuth = useAuthUpdater()
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    ;(async () => {
      try {
        setDoctors(await getDoctors())
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
  }, [updateAuth, setDoctors])

  return [doctors, isLoading]
}
