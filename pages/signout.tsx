import { useRouter } from "next/router"

import { useAuthUpdater, useUserSignedIn } from "../api/auth"

export default function Signout() {
  const router = useRouter()
  const updateAuth = useAuthUpdater()
  const isSignedIn = useUserSignedIn()

  if (isSignedIn) {
    updateAuth(null, null)
  }

  if (typeof window !== "undefined") {
    router.push("/signin")
  }

  return null
}
