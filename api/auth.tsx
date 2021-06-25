import { createContext, useContext, useState, useCallback, FC } from "react"

const JWTGetTokenContext = createContext<string | null>(null)
const JWTUpdateTokenContext = createContext<(token: string) => void>(() => null)

function readJwtToken() {
  if (typeof sessionStorage === "undefined") return null
  return sessionStorage.getItem("jwt")
}

function storeJwtToken(token: string) {
  if (typeof sessionStorage === "undefined") return
  sessionStorage.setItem("jwt", token)
}

export function useAuthJwt(): [string | null, (token: string) => void] {
  return [useContext(JWTGetTokenContext), useContext(JWTUpdateTokenContext)]
}

export const JWTTokenProvider: FC<{}> = (props) => {
  const [jwtToken, setJwtToken] = useState<string | null>(() => readJwtToken())
  const updateJwtToken = useCallback(
    (token: string) => {
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
