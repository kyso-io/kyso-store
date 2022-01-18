import { User } from '@kyso-io/kyso-model';
import { createSlice } from '@reduxjs/toolkit';
import { ActionWithPayload } from '../../types/action-with-payload';
import { refreshUserAction, updateUserAction } from './user-actions';

export type UserState = {
  user: User | null;
};

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: ActionWithPayload<User | null>) => {
      state.user = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(refreshUserAction.fulfilled, (state: UserState, action: ActionWithPayload<User | null>) => {
      state.user = action.payload;
    });
    builder.addCase(updateUserAction.fulfilled, (state: UserState, action: ActionWithPayload<User | null>) => {
      state.user = action.payload;
    });
  },
});

export default userSlice.reducer;
