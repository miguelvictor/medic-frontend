import {
  createContext,
  useContext,
  useState,
  useCallback,
  PropsWithChildren,
} from "react"
import { appAxios } from "./axios"
import {
  NotFoundError,
  ServerError,
  UnauthorizedError,
  UnknownError,
} from "./errors"
import { SigninResponse } from "./responses"

export type AccessToken = string | null
export type RefreshToken = string | null
export type AppTokenPair = [AccessToken, RefreshToken]
export type AppTokenPairUpdater = (
  accessToken: AccessToken,
  refreshToken: RefreshToken
) => void

const JWTGetTokenContext = createContext<AccessToken>(null)
const JWTUpdateTokenContext = createContext<AppTokenPairUpdater>(() => null)

function readJwtToken(): AppTokenPair {
  if (typeof sessionStorage === "undefined") return [null, null]

  const access = sessionStorage.getItem("access")
  const refresh = sessionStorage.getItem("refresh")

  return [access, refresh]
}

function storeJwtToken(accessToken: AccessToken, refreshToken: RefreshToken) {
  if (typeof sessionStorage === "undefined") return

  if (accessToken === null) {
    sessionStorage.removeItem("access")
  } else {
    sessionStorage.setItem("access", accessToken)
  }

  if (refreshToken === null) {
    sessionStorage.removeItem("refresh")
  } else {
    sessionStorage.setItem("refresh", refreshToken)
  }
}

export async function signin(
  username: string,
  password: string
): Promise<AppTokenPair> {
  try {
    const reqBody = { username, password }
    const response = await appAxios.post("/jwt-token/", reqBody)
    const { access, refresh } = response.data as SigninResponse

    return [access, refresh]
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

export function useUserSignedIn(): boolean {
  return useContext(JWTGetTokenContext) !== null
}

export function useAuthUpdater(): AppTokenPairUpdater {
  return useContext(JWTUpdateTokenContext)
}

export function JWTTokenProvider({ children }: PropsWithChildren<{}>) {
  const [jwtToken, setJwtToken] = useState<AppTokenPair>(() => readJwtToken())
  const updateJwtToken = useCallback(
    (accessToken: AccessToken, refreshToken: RefreshToken) => {
      storeJwtToken(accessToken, refreshToken)
      setJwtToken([accessToken, refreshToken])
    },
    [setJwtToken]
  )

  return (
    <JWTGetTokenContext.Provider value={jwtToken[0]}>
      <JWTUpdateTokenContext.Provider value={updateJwtToken}>
        {children}
      </JWTUpdateTokenContext.Provider>
    </JWTGetTokenContext.Provider>
  )
}
