import { Discussion, ActionWithPayload } from '@kyso-io/kyso-model';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import listToKeyVal from '../../helpers/list-to-key-val';
import { updateDiscussion, fetchDiscussionsOfATeam, fetchDiscussionById, fetchDiscussionsAction } from './discussions-actions';


export type DiscussionsState = {
  activeId: string | null | undefined; // single id of active report
  activeIds: string[];
  entities: { [key: string]: Discussion | null | undefined } | null; // all the reports by id
  limit: number;
  page: number;
};

const initialState: DiscussionsState = {
  activeId: null,
  activeIds: [],
  entities: {},
  limit: 20,
  page: 1,
};

const discussionsSlice = createSlice({
  name: 'discussions',
  initialState,
  reducers: {
    setDiscussions: (state: DiscussionsState, action: ActionWithPayload<Discussion[]>) => {
      state.entities = {
        ...state.entities,
        ...listToKeyVal(action.payload),
      };
      state.activeIds = action.payload!.map((entity: Discussion) => entity.id as string);

    },
    setPageAndLimit: (state: DiscussionsState, action: ActionWithPayload<{ page?: number; limit?: number }>) => {
      state.page = action.payload?.page || initialState.page;
      state.limit = action.payload?.limit || initialState.limit;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchDiscussionsAction.fulfilled, (state: DiscussionsState, action: ActionWithPayload<Discussion[]>) => {
      if (!action.payload) return;
      state.entities = {
        ...state.entities,
        ...listToKeyVal(action.payload),
      };
      state.activeIds = action.payload!.map((entity: Discussion) => entity.id as string);
    });

    builder.addCase(fetchDiscussionsOfATeam.fulfilled, (state: DiscussionsState, action: ActionWithPayload<Discussion[]>) => {
      if (!action.payload) return;
      state.entities = {
        ...state.entities,
        ...listToKeyVal(action.payload),
      };
      state.activeIds = action.payload!.map((entity: Discussion) => entity.id as string);
    });

    builder.addCase(fetchDiscussionById.fulfilled, (state: DiscussionsState, action: ActionWithPayload<Discussion>) => {
      state.activeId = action.payload!.id;
      state.entities = {
        ...state.entities,
        [action.payload!.id as string]: action.payload!,
      };
    });

    builder.addCase(updateDiscussion.fulfilled, (state: DiscussionsState, action: ActionWithPayload<Discussion>) => {
      state.activeId = action.payload!.id;
      state.entities = {
        ...state.entities,
        [action.payload!.id as string]: action.payload!,
      };
    });
  },
});

export const selectDiscussionById = (state: RootState, id: string) => {
  return state.discussions.entities![id]
}

export default discussionsSlice.reducer;
