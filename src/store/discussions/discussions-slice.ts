import { ActionWithPayload, Discussion } from '@kyso-io/kyso-model';
import { createSlice } from '@reduxjs/toolkit';
import { fetchDiscussionById, fetchDiscussionsAction, fetchDiscussionsOfATeam, updateDiscussion } from './discussions-actions';

export type DiscussionsState = {
  list: Discussion[];
  limit: number;
  page: number;
  searchDiscussion: string;
};

const initialState: DiscussionsState = {
  list: [],
  limit: 20,
  page: 1,
  searchDiscussion: '',
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
    setSearchDiscussion: (state: DiscussionsState, action: ActionWithPayload<string>) => {
      state.searchDiscussion = action.payload!;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchDiscussionsAction.fulfilled, (state: DiscussionsState, action: ActionWithPayload<Discussion[]>) => {
      state.list = action.payload!;
    });

    builder.addCase(fetchDiscussionsOfATeam.fulfilled, (state: DiscussionsState, action: ActionWithPayload<Discussion[]>) => {
      state.list = action.payload!;
    });

    builder.addCase(fetchDiscussionById.fulfilled, (state: DiscussionsState, action: ActionWithPayload<Discussion>) => {
      state.list = [action.payload!];
    });

    builder.addCase(updateDiscussion.fulfilled, (state: DiscussionsState, action: ActionWithPayload<Discussion>) => {
      state.list = [action.payload!];
    });
  },
});

export const { setSearchDiscussion } = discussionsSlice.actions;

export default discussionsSlice.reducer;
