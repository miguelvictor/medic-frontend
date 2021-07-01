import { createContext, useContext, useState, useCallback, FC } from "react"
import { API_URL } from "./api"

export interface AppJwtToken {
  access: string
  refresh: string
}
export type AppJwtTokenOpt = AppJwtToken | null

const JWTGetTokenContext = createContext<AppJwtTokenOpt>(null)
const JWTUpdateTokenContext = createContext<(token: AppJwtTokenOpt) => void>(
  () => null
)

function readJwtToken(): AppJwtTokenOpt {
  if (typeof sessionStorage === "undefined") return null

  const access = sessionStorage.getItem("access")
  const refresh = sessionStorage.getItem("refresh")
  if (access === null || refresh === null) {
    return null
  }

  return { access, refresh }
}

function storeJwtToken(token: AppJwtTokenOpt) {
  if (typeof sessionStorage === "undefined") return

  if (token === null) {
    sessionStorage.removeItem("access")
    sessionStorage.removeItem("refresh")
    return
  }

  const { access, refresh } = token
  sessionStorage.setItem("access", access)
  sessionStorage.setItem("refresh", refresh)
}

export async function signin(
  username: string,
  password: string
): Promise<AppJwtToken> {
  const url = `${API_URL}/token/`
  const response = await fetch(url, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  })

  if (!response.ok) {
    switch (Math.floor(response.status / 100)) {
      case 4:
        throw "Invalid Credentials"
      case 5:
        throw "Server Error"
      default:
        throw "Unknown Error"
    }
  }

  return (await response.json()) as AppJwtToken
}

export function useAuthJwt(): [
  AppJwtTokenOpt,
  (token: AppJwtTokenOpt) => void
] {
  return [useContext(JWTGetTokenContext), useContext(JWTUpdateTokenContext)]
}

export function useUserSignedIn() {
  const jwtToken = useContext(JWTGetTokenContext)
  const isSignedIn = jwtToken !== null

  return isSignedIn
}

export const JWTTokenProvider: FC<{}> = (props) => {
  const [jwtToken, setJwtToken] = useState<AppJwtTokenOpt>(() => readJwtToken())
  const updateJwtToken = useCallback(
    (token: AppJwtTokenOpt) => {
      storeJwtToken(token)
      setJwtToken(token)
    },
    [setJwtToken]
  )

  return (
    <JWTGetTokenContext.Provider value={jwtToken}>
      <JWTUpdateTokenContext.Provider value={updateJwtToken}>
        {props.children}
      </JWTUpdateTokenContext.Provider>
    </JWTGetTokenContext.Provider>
  )
}
