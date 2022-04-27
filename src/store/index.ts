import { combineReducers, configureStore } from '@reduxjs/toolkit';
import auth from './auth/auth-slice';
import bitbucketRepositories from './bitbucket/bitbucket-repositories-slice';
import comments from './comments/comments-slice';
import discussions from './discussions/discussions-slice';
import error from './error/error-slice';
import githubRepositories from './github/github-repositories-slice';
import invitations from './invitations/invitations-slice';
import organizations from './organizations/organizations-slice';
import reports from './reports/reports-slice';
import repos from './repos/repos-slice';
import kysoSettings from './settings/settings-slice';
import tags from './tags/tags-slice';
import teams from './teams/teams-slice';
import user from './user/user-slice';

export const reducer = combineReducers({
  auth,
  bitbucketRepositories,
  comments,
  discussions,
  error,
  githubRepositories,
  invitations,
  organizations,
  reports,
  repos,
  tags,
  teams,
  user,
  kysoSettings,
});

export const store: any = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Export actions
export * from './auth/auth-actions';
export * from './auth/auth-slice';
export * from './bitbucket/bitbucket-actions';
export * from './bitbucket/bitbucket-repositories-slice';
export * from './comments/comments-actions';
export * from './comments/comments-slice';
export * from './discussions/discussions-actions';
export * from './discussions/discussions-slice';
export * from './error/error-slice';
export * from './feedback/feedback-actions';
export * from './full-search/full-search-actions';
export * from './github/github-actions';
export * from './github/github-repositories-slice';
export * from './inline-comments/inline-comments-actions';
export * from './invitations/invitations-actions';
export * from './invitations/invitations-slice';
export * from './organizations/organizations-actions';
export * from './organizations/organizations-slice';
export * from './relations/relations-actions';
export * from './reports/reports-actions';
export * from './reports/reports-slice';
export * from './repos/repos-actions';
export * from './repos/repos-slice';
export * from './settings/settings-actions';
export * from './settings/settings-slice';
export * from './tags/tags-actions';
export * from './teams/teams-actions';
export * from './teams/teams-slice';
export * from './user/user-actions';
export * from './user/user-slice';
