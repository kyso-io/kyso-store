import { ActionWithPayload, GithubRepository, LoginProviderEnum } from '@kyso-io/kyso-model';
import { createSlice } from '@reduxjs/toolkit';
import { fetchRepositoriesAction, fetchRepositoryAction, fetchRepositoryTreeAction } from './repos-actions';

export type ReposState = {
  list: GithubRepository[];
  limit: number;
  page: number;
  active: GithubRepository | null;
  searchQuery: string | null;
  provider: LoginProviderEnum;
  branches: any[];
  currentBranch: any;
  commits: any[];
  tree: any;
  requesting: boolean;
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
  requesting: true,
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
    setRequestingRepos: (state: ReposState, action: ActionWithPayload<boolean>) => {
      state.requesting = action.payload!;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchRepositoriesAction.fulfilled, (state: ReposState, action: ActionWithPayload<GithubRepository[]>) => {
      state.list = action.payload!;
      state.requesting = false;
    });
    builder.addCase(fetchRepositoryAction.fulfilled, (state: ReposState, action: ActionWithPayload<GithubRepository>) => {
      state.active = action.payload!;
    });
    builder.addCase(fetchRepositoryTreeAction.rejected, (state: ReposState, action: ActionWithPayload<any>) => {
      state.tree = action.payload;
    });
  },
});

export const { setSearchQuery, setProvider, setRequestingRepos } = reposSlice.actions;

export default reposSlice.reducer;
