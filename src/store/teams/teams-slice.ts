import { createSlice } from '@reduxjs/toolkit';
import { Relations, Team, ActionWithPayload } from '@kyso-io/kyso-model';
import { fetchTeamAction } from './teams-actions';
import { fetchRelationsAction } from '../relations/relations-actions'
import { RootState } from '..';

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
        [action.payload!.id as string]: action.payload
      };
      state.activeId = action.payload!.id
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchTeamAction.fulfilled, (state: TeamsState, action: ActionWithPayload<Team>) => {
      state.activeId = action.payload!.id;
    });
    builder.addCase(fetchRelationsAction, (state: TeamsState, action: ActionWithPayload<Relations>) => {
      state.entities = {
        ...state.entities,
        ...action.payload?.team,
      }
    });    
  },
});

export const { setTeam } = teamsSlice.actions;

export const selectActiveTeam = (state: RootState) => {
  if (!state.teams.activeId) return null;
  if (state.teams.entities!.length === 0) return null;
  return state.teams.entities![state.teams.activeId];
};

export default teamsSlice.reducer;
