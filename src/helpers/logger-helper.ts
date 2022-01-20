import { AuthState } from "../store/auth/auth-slice"

export const printAuthenticated = (auth: AuthState) => {
  return `${auth.token ? '[AUTHENTICATED]' : '[UNAUTHENTICATED]'}`
}