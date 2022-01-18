import { LoginProviderEnum, Repository } from '@kyso-io/kyso-model';
import { createSlice } from '@reduxjs/toolkit';
import { ActionWithPayload } from '../../types/action-with-payload';
import { fetchRepoAction, fetchReposAction, fetchRepoTreeAction } from './repos-actions';

export type ReposState = {
  list: Repository[];
  limit: number;
  page: number;
  active: Repository | null;
  searchQuery: string | null;
  provider: LoginProviderEnum;
  branches: any[];
  currentBranch: any;
  commits: any[];
  tree: any;
};

const initialState: ReposState = {
  list: [],
  limit: 20,
  page: 1,
  active: null,
  searchQuery: null,
  provider: LoginProviderEnum.GITHUB,
  branches: [],
  currentBranch: null,
  commits: [],
  tree: null,
};

const reposSlice = createSlice({
  name: 'repos',
  initialState,
  reducers: {
    setRepos: (state: ReposState, action: ActionWithPayload<any[]>) => {
      state.list = action.payload!;
    },
    setRepo: (state: ReposState, action: ActionWithPayload<any>) => {
      state.active = action.payload!;
    },
    setPageAndLimit: (state: ReposState, action: ActionWithPayload<{ page?: number; limit?: number }>) => {
      state.page = action.payload?.page || initialState.page;
      state.limit = action.payload?.limit || initialState.limit;
    },
    setSearchQuery: (state: ReposState, action: ActionWithPayload<string | null>) => {
      state.searchQuery = action.payload;
    },
    setProvider: (state: ReposState, action: ActionWithPayload<LoginProviderEnum>) => {
      state.provider = action.payload!;
    },
    setBranches: (state: ReposState, action: ActionWithPayload<any>) => {
      state.branches = action.payload;
    },
    setCommits: (state: ReposState, action: ActionWithPayload<any>) => {
      state.commits = action.payload;
    },
    setTree: (state: ReposState, action: ActionWithPayload<any>) => {
      state.tree = action.payload;
    },
    setCurrentBranch: (state: ReposState, action: ActionWithPayload<any>) => {
      state.currentBranch = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchReposAction.fulfilled, (state: ReposState, action: ActionWithPayload<Repository[]>) => {
      state.list = action.payload!;
    });
    builder.addCase(fetchRepoAction.fulfilled, (state: ReposState, action: ActionWithPayload<Repository>) => {
      state.active = action.payload!;
    });
    builder.addCase(fetchRepoTreeAction.rejected, (state: ReposState, action: ActionWithPayload<any>) => {
      state.tree = action.payload;
    });
  },
});

export const { setSearchQuery, setProvider, setPageAndLimit } = reposSlice.actions;

export default reposSlice.reducer;
