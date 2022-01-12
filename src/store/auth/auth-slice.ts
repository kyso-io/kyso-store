import { createSlice } from '@reduxjs/toolkit';
import { loginAction } from './auth-actions';

export type AuthState = {
  token: string | null;
};

const initialState: AuthState = {
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loginAction.fulfilled, (state: AuthState, action) => {
      state.token = action.payload;
    });
  },
});

export default authSlice.reducer;
