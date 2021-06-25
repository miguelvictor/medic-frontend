import { JWTTokenProvider } from "../api/auth"
import type { AppProps } from "next/app"
import "../styles/globals.css"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <JWTTokenProvider>
      <Component {...pageProps} />
    </JWTTokenProvider>
  )
}
export default MyApp
