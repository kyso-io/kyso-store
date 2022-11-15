/* eslint-disable no-prototype-builtins */
import { Discussion } from '@kyso-io/kyso-model';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import listToKeyVal from '../../helpers/list-to-key-val';
import { ActionWithPayload } from '../../types/action-with-payload';
import { fetchDiscussionById, fetchDiscussionsAction, fetchDiscussionsOfATeam, updateDiscussion } from './discussions-actions';

export type DiscussionsState = {
  activeId: string | null | undefined; // single id of active report
  activeIds: string[];
  entities: { [key: string]: Discussion }; // all the reports by id
  limit: number;
  page: number;
  searchDiscussion: string;
};

const initialState: DiscussionsState = {
  activeId: null,
  activeIds: [],
  entities: {},
  limit: 20,
  page: 1,
  searchDiscussion: '',
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
    setSearchDiscussion: (state: DiscussionsState, action: ActionWithPayload<string>) => {
      state.searchDiscussion = action.payload!;
    },
    resetDiscussionsSlice: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
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
      if (!action.payload || !action.payload.id) return;

      state.activeId = action.payload!.id;
      state.entities = {
        ...state.entities,
        [action.payload!.id as string]: action.payload!,
      };
    });

    builder.addCase(updateDiscussion.fulfilled, (state: DiscussionsState, action: ActionWithPayload<Discussion>) => {
      if (!action.payload || !action.payload.id) return;

      state.activeId = action.payload!.id;
      state.entities = {
        ...state.entities,
        [action.payload!.id as string]: action.payload!,
      };
    });
  },
});

export const selectDiscussionById = (state: RootState, id: string): Discussion | null => {
  if (state.discussions.entities.hasOwnProperty(id)) {
    return state.discussions.entities![id];
  }
  return null;
};

export const getActiveDiscussions = (state: RootState, args?: { sortBy: string; mode: 'asc' | 'desc' }): Discussion[] => {
  const discussions: Discussion[] = [];
  state.discussions.activeIds.forEach((id: string) => {
    if (state.discussions.entities.hasOwnProperty(id)) {
      discussions.push(state.discussions.entities![id] as Discussion);
    }
  });
  if (args && args?.sortBy && args.sortBy.length > 0 && args?.mode && (args.mode === 'asc' || args.mode === 'desc')) {
    return discussions.sort((a: any, b: any) => {
      if (!a.hasOwnProperty(args.sortBy) || !b.hasOwnProperty(args.sortBy)) {
        return 0;
      }
      if (a[args.sortBy] < b[args.sortBy]) {
        return args.mode === 'asc' ? -1 : 1;
      }
      if (a[args.sortBy] > b[args.sortBy]) {
        return args.mode === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }
  return discussions;
};

export const { setSearchDiscussion, resetDiscussionsSlice } = discussionsSlice.actions;

export default discussionsSlice.reducer;
