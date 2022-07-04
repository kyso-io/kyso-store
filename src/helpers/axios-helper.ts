import { AuthState } from '../store/auth/auth-slice';

export const buildAuthHeaders = (auth: AuthState, organizationId?: string, teamId?: string) => {
  const headers: any = {};

  if (auth.token) {
    headers['Authorization'] = `Bearer ${auth.token}`;
  }

  const team: string | null = teamId ? teamId : auth.team;

  if (team) {
    headers['x-kyso-team'] = team;
  }

  const organization: string | null = organizationId ? organizationId : auth.organization;

  if (organization) {
    headers['x-kyso-organization'] = organization;
  }

  return headers;
};

export const getAPIBaseURL = () => {
  if (process.env.KYSO_API) {
    return process.env.KYSO_API;
  }

  return process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL : '/api/v1';
};
