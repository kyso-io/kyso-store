import { User } from '@kyso-io/kyso-model';
import { Relation } from '../../types/relations';
import { createSlice } from '@reduxjs/toolkit';
import { ActionWithPayload } from '../../types/action-with-payload';
import { fetchRelationsAction } from '../relations/relations-actions';
import { refreshUserAction, updateUserAction } from './user-actions';

export type UserState = {
  user: User | null;
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
    builder.addCase(fetchRelationsAction, (state: UserState, action: ActionWithPayload<Relation>) => {
      state.entities = {
        ...state.entities,
        ...action.payload?.user,
      }
    });    
  },
});

export default userSlice.reducer;
