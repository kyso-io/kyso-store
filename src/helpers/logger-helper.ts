import { AuthState } from '../store/auth/auth-slice';

export const printAuthenticated = (auth: AuthState): string => {
  return `${auth.token ? '[AUTHENTICATED]' : '[UNAUTHENTICATED]'}`;
};

export const verbose = (message: any): void => {
  if (process.env.KYSO_CLI_VERBOSE === 'true') {
    console.log(message);
  }
};
