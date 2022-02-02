import { Discussion, ActionWithPayload } from '@kyso-io/kyso-model';
import { createSlice } from '@reduxjs/toolkit';
import { fetchDiscussionsOfATeam } from './discussions-actions';
import { fetchDiscussionsAction } from './discussions-actions';

export type DiscussionsState = {
  list: Discussion[];
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
    builder.addCase(fetchDiscussionsAction.fulfilled, (state: DiscussionsState, action: ActionWithPayload<Discussion[]>) => {
      state.list = action.payload!;
    });

    builder.addCase(fetchDiscussionsOfATeam.fulfilled, (state: DiscussionsState, action: ActionWithPayload<Discussion[]>) => {
      state.list = action.payload!;
      console.log(state)
    });
  },
});

export default discussionsSlice.reducer;
