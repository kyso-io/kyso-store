import { User, ActionWithPayload, Relations, UserDTO } from '@kyso-io/kyso-model';
import { createSlice } from '@reduxjs/toolkit';
import { fetchRelationsAction } from '../relations/relations-actions';
import { refreshUserAction, updateUserAction, fetchUsersAction } from './user-actions';

export type UserState = {
  user: UserDTO | null;
  entities: { [key: string]: any | null | undefined } | null; // all the reports by id
};

const initialState: UserState = {
  user: null,
  entities: {}
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: ActionWithPayload<UserDTO | null>) => {
      state.user = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(refreshUserAction.fulfilled, (state: UserState, action: ActionWithPayload<UserDTO>) => {
      state.user = action.payload;
    });
    builder.addCase(updateUserAction.fulfilled, (state: UserState, action: ActionWithPayload<UserDTO>) => {
      state.user = action.payload;
    });
    builder.addCase(fetchRelationsAction, (state: UserState, action: ActionWithPayload<Relations>) => {
      state.entities = {
        ...state.entities,
        ...action.payload?.user,
      }
    });

    builder.addCase(fetchUsersAction.fulfilled, (state: UserState, action: ActionWithPayload<UserDTO[]>) => {
      state.entities = {
        ...state.entities,
        ...action.payload,
      }
    });
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
