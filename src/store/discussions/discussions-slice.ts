import { createSlice } from '@reduxjs/toolkit';
import { ActionWithPayload } from '../../types/action-with-payload';
import { fetchDiscussionsAction } from './discussions-actions';

export type DiscussionsState = {
  list: any[];
  limit: number;
  page: number;
};

const initialState: DiscussionsState = {
  list: [],
  limit: 20,
  page: 1,
};

const discussionsSlice = createSlice({
  name: 'discussions',
  initialState,
  reducers: {
    setDiscussions: (state: DiscussionsState, action: ActionWithPayload<any[]>) => {
      state.list = action.payload!;
    },
    setPageAndLimit: (state: DiscussionsState, action: ActionWithPayload<{ page?: number; limit?: number }>) => {
      state.page = action.payload?.page || initialState.page;
      state.limit = action.payload?.limit || initialState.limit;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchDiscussionsAction.fulfilled, (state: DiscussionsState, action: ActionWithPayload<any[]>) => {
      state.list = action.payload!;
    });
  },
});

export default discussionsSlice.reducer;
