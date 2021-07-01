import { useState, useEffect } from "react"
import { useRouter } from "next/router"

import { useAuthUpdater } from "./auth"
import { appAxios } from "./axios"
import {
  NotFoundError,
  ServerError,
  UnauthorizedError,
  UnknownError,
} from "./errors"
import { Doctor } from "./models"

export async function getDoctor(id: string): Promise<Doctor> {
  try {
    const body = await appAxios.get(`/doctors/${id}/`)

    return body.data as Doctor
  } catch (error) {
    // HTTP error
    if (error.response) {
      switch (error.response.status) {
        case 401:
          throw new UnauthorizedError()
        case 404:
          throw new NotFoundError()
        case 500:
          throw new ServerError()
        default:
          throw new UnknownError()
      }
    }

    // other errors
    if (error.request) {
      console.error("no response received")
      console.log(error.request)
    } else {
      console.error(error.message)
    }

    console.log(error.config)
    throw new UnknownError()
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
