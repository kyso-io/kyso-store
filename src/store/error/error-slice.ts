import { createSlice } from '@reduxjs/toolkit';
import { ActionWithPayload } from '../../types/action-with-payload';

export type ErrorState = {
  text: string | null;
};

const initialState: ErrorState = {
  text: null,
};

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError: (state: ErrorState, action: ActionWithPayload<string | null>) => {
      state.text = action.payload!;
    },
  },
});

export const { setError } = errorSlice.actions;

export default errorSlice.reducer;
