import { Invitation } from '@kyso-io/kyso-model';
import { createSlice } from '@reduxjs/toolkit';
import { ActionWithPayload } from '../../types/action-with-payload';

export type Invitations = {
  invitations: Invitation[];
};

const initialState: Invitations = {
  invitations: [],
};

const invitationsSlice = createSlice({
  name: 'invitation',
  initialState,
  reducers: {
    setInvitations: (state, action: ActionWithPayload<Invitation[]>) => {
      state.invitations = action.payload!;
    },
    resetInvitationsSlice: () => {
      return initialState;
    },
  },
});
export const { resetInvitationsSlice } = invitationsSlice.actions;

export default invitationsSlice.reducer;
