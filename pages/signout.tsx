import { useRouter } from "next/router"

import { useAuthJwt } from "../api/auth"

export default function Signout() {
  const router = useRouter()
  const [jwtToken, setJwtToken] = useAuthJwt()

  if (jwtToken !== null) {
    setJwtToken(null)
  }

  router.push("/signin")
  return null
}
