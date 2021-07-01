import axios from "axios"
import { RefreshTokenResponse } from "./responses"

export const API_URL = "http://localhost:8000/api/v1/"

// initialize axios instance with interceptors
export const appAxios = axios.create({
  baseURL: API_URL,
  timeout: 1000,
})
appAxios.interceptors.request.use(
  async (config) => {
    // attach access token if it exists
    if (typeof sessionStorage !== "undefined") {
      const accessToken = sessionStorage.getItem("access")

      if (accessToken !== null) {
        config.headers["Authorization"] = `Bearer ${accessToken}`
      }
    }

    return config
  },
  (error) => Promise.reject(error)
)
appAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (
      typeof sessionStorage === "undefined" ||
      error.response.status !== 401 ||
      originalRequest._retry
    ) {
      return Promise.reject(error)
    }

    // check if refresh token exists
    const refreshToken = sessionStorage.getItem("refresh")
    if (refreshToken === null) {
      return Promise.reject(error)
    }

    try {
      // attempt to request new access token
      const accessToken = await refreshAccessToken(refreshToken)

      // store newly acquired access token
      sessionStorage.setItem("access", accessToken)

      // attempt to retry request with the newly acquired token
      originalRequest.headers["Authorization"] = `Bearer ${accessToken}`

      return appAxios(originalRequest)
    } catch (_) {
      return Promise.reject(error)
    }
  }
)

async function refreshAccessToken(refreshToken: string): Promise<string> {
  const url = `${API_URL}jwt-token/refresh/`
  const response = await axios.post(url, { refresh: refreshToken })
  const { access } = response.data as RefreshTokenResponse

  return access
}
