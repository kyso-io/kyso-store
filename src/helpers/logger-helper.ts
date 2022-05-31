import { AuthState } from "../store/auth/auth-slice"

export const printAuthenticated = (auth: AuthState) => {
  return `${auth.token ? '[AUTHENTICATED]' : '[UNAUTHENTICATED]'}`
}

export const verbose = (message: string) => {
  if(process.env.KYSO_CLI_VERBOSE === "true") {
    console.log(message)
  }
}