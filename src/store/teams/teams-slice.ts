/* eslint-disable no-prototype-builtins */
import { ActionWithPayload, Organization, Relations, Team } from '@kyso-io/kyso-model';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import slugify from '../../helpers/slugify';
import { fetchRelationsAction } from '../relations/relations-actions';
import { fetchTeamAction, updateTeamAction } from './teams-actions';

export type TeamsState = {
  activeId: string | null | undefined; // single id of active organization
  activeIds: object | null; // list of ids for showing lists of organizations
  entities: { [key: string]: any | null | undefined } | null; // all the organizations by id
};

const initialState: TeamsState = {
  activeId: null,
  activeIds: [],
  entities: {},
};

const teamsSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    setTeam: (state: TeamsState, action: ActionWithPayload<Team>) => {
      state.entities = {
        ...state.entities,
        [action.payload!.id as string]: action.payload,
      };
      state.activeId = action.payload!.id;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchTeamAction.fulfilled, (state: TeamsState, action: ActionWithPayload<Team>) => {
      state.entities = {
        ...state.entities,
        [action.payload!.id as string]: action.payload,
      };
      state.activeId = action.payload!.id;
    });
    builder.addCase(updateTeamAction.fulfilled, (state: TeamsState, action: ActionWithPayload<Team>) => {
      state.entities = {
        ...state.entities,
        [action.payload!.id as string]: action.payload,
      };
      state.activeId = action.payload!.id;
    });
    builder.addCase(fetchRelationsAction, (state: TeamsState, action: ActionWithPayload<Relations>) => {
      state.entities = {
        ...state.entities,
        ...action.payload?.team,
      };
    });
  },
});

export const { setTeam } = teamsSlice.actions;

export const selectActiveTeam = (state: RootState) => {
  if (!state.teams.activeId) return null;
  if (state.teams.entities!.length === 0) return null;
  return state.teams.entities![state.teams.activeId];
};

export const selectTeamByFilter = (state: RootState, filter: { key: string; value: string }) => {
  if (state.teams.entities!.length === 0) return null;
  return Object.values(state.teams.entities!).find((team: any) => team[filter.key] === filter.value);
};

export const selectTeamBySlugifiedName = (state: RootState, name: string) => {
  if (!name) {
    return null;
  }
  return Object.values(state.teams.entities!).find((team: any /*{ name: string; sluglified_name: string }*/) => {
    return (team?.name && team.name !== '' && slugify(team.name) === name) || team?.sluglified_name === name;
  });
};

export const getOrgAndTeamGivenSluglifiedOrgAndTeam = (state: RootState, orgSlug: string, teamSlug: string) => {
  let organization: Organization | null = null;
  let team: Team | null = null;
  if (!orgSlug || orgSlug.length === 0 || !teamSlug || teamSlug.length === 0) {
    return { organization, team };
  }
  for (const organizationId in state.organizations.entities) {
    if (state.organizations.entities.hasOwnProperty(organizationId)) {
      const tmpOrganization: any = state.organizations.entities[organizationId];
      if (tmpOrganization?.sluglified_name === orgSlug || tmpOrganization?.name === orgSlug) {
        organization = tmpOrganization;
        break;
      }
    }
  }
  if (!organization) {
    return { organization, team };
  }
  for (const teamId in state.teams.entities) {
    if (state.teams.entities.hasOwnProperty(teamId)) {
      const tmpTeam: any = state.teams.entities[teamId];
      if ((tmpTeam?.sluglified_name === teamSlug || tmpTeam?.name === teamSlug) && organization.id === tmpTeam.organization_id) {
        team = tmpTeam;
        break;
      }
    }
  }
  return { organization, team };
};

export default teamsSlice.reducer;
