/* eslint-disable no-prototype-builtins */
import { ActionWithPayload, Relations, User, UserDTO } from '@kyso-io/kyso-model';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import listToKeyVal from '../../helpers/list-to-key-val';
import { fetchRelationsAction } from '../relations/relations-actions';
import { fetchUsersAction, refreshUserAction, updateUserAction } from './user-actions';

export type UserState = {
  user: UserDTO | null;
  entities: { [key: string]: any | null | undefined } | null; // all the reports by id
};

const initialState: UserState = {
  user: null,
  entities: {},
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: ActionWithPayload<UserDTO | null>) => {
      state.user = action.payload;
    },
    resetUserSlice: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(refreshUserAction.fulfilled, (state: UserState, action: ActionWithPayload<UserDTO>) => {
      const updatedUser: any = { ...state.user, ...action.payload };
      state.user = updatedUser;
    });
    builder.addCase(updateUserAction.fulfilled, (state: UserState, action: ActionWithPayload<UserDTO>) => {
      state.user = action.payload;
    });
    builder.addCase(fetchRelationsAction, (state: UserState, action: ActionWithPayload<Relations>) => {
      state.entities = {
        ...state.entities,
        ...action.payload?.user,
      };
    });
    builder.addCase(fetchUsersAction.fulfilled, (state: UserState, action: ActionWithPayload<UserDTO[]>) => {
      if (!action.payload) return;
      state.entities = {
        ...state.entities,
        ...listToKeyVal(action.payload),
      };
    });
  },
});

export const selectUser = (state: RootState) => {
  return state.user.user;
};

export const selectUserGivenId = (state: RootState, userId: string): User | null => {
  if (!state.user.entities) {
    return null;
  }
  return state.user.entities.hasOwnProperty(userId) ? state.user.entities[userId] : null;
};

export const { setUser, resetUserSlice } = userSlice.actions;

export default userSlice.reducer;
