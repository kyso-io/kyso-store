import { Team } from '@kyso-io/kyso-model';
import { createSlice } from '@reduxjs/toolkit';
import { ActionWithPayload } from '../../types/action-with-payload';
import { fetchTeamAction } from './team-actions';

export type TeamState = {
  team: Team | null;
};

const initialState: TeamState = {
  team: null,
};

const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    setTeam: (state, action: ActionWithPayload<Team>) => {
      state.team = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchTeamAction.fulfilled, (state: TeamState, action: ActionWithPayload<Team | null>) => {
      state.team = action.payload;
    });
  },
});

export default teamSlice.reducer;
