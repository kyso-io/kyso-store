import { ActionWithPayload, Invitation } from '@kyso-io/kyso-model';
import { createSlice } from '@reduxjs/toolkit';

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
  },
});

export default invitationsSlice.reducer;
