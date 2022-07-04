import { Organization, Team } from '@kyso-io/kyso-model';
import { fetchOrganizationAction, fetchTeamAction, store } from '../store';
import { AuthState } from '../store/auth/auth-slice';

export const buildAuthHeaders = async (auth: AuthState, organizationId?: string, teamId?: string) => {
  const headers: any = {};

  if (auth.token) {
    headers['Authorization'] = `Bearer ${auth.token}`;
  }

  let organizationData: Organization | undefined = undefined;
  let teamData: Team | undefined = undefined;
  
  if(organizationId) {
    console.log(`Retrieving ad-hoc specific data from organization ${organizationId}`);
    organizationData = (await store.dispatch(fetchOrganizationAction(organizationId as string))).payload;
  }

  if(teamId) {
    console.log(`Retrieving ad-hoc specific data from team ${teamId}`);
    teamData = (await store.dispatch(fetchTeamAction(teamId as string))).payload;
  }

  const team: string | null = teamData ? teamData.sluglified_name : auth.team;

  if (team) {
    headers['x-kyso-team'] = team;
  }

  const organization: string | null = organizationData ? organizationData.sluglified_name : auth.organization;

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
