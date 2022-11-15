import { GithubRepository } from '@kyso-io/kyso-model';
import { createSlice } from '@reduxjs/toolkit';
import { ActionWithPayload } from '../../types/action-with-payload';

export type GithubRepositories = {
  repositories: GithubRepository[];
};

const initialState: GithubRepositories = {
  repositories: [],
};

const githubRepositoriesSlice = createSlice({
  name: 'githubRepositories',
  initialState,
  reducers: {
    setRepositories: (state: GithubRepositories, action: ActionWithPayload<GithubRepository[]>) => {
      state.repositories = action.payload!;
    },
    resetGithubRepositoriesSlice: () => {
      return initialState;
    },
  },
});

export const { resetGithubRepositoriesSlice } = githubRepositoriesSlice.actions;

export default githubRepositoriesSlice.reducer;
