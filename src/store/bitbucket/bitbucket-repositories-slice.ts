import { ActionWithPayload, GithubRepository } from '@kyso-io/kyso-model';
import { createSlice } from '@reduxjs/toolkit';

export type BitbucketRepositories = {
  repositories: GithubRepository[];
};

const initialState: BitbucketRepositories = {
  repositories: [],
};

const bitbucketRepositoriesSlice = createSlice({
  name: 'bitbucketRepositories',
  initialState,
  reducers: {
    setRepositories: (state: BitbucketRepositories, action: ActionWithPayload<GithubRepository[]>) => {
      state.repositories = action.payload!;
    },
  },
});

export default bitbucketRepositoriesSlice.reducer;
