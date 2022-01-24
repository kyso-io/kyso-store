import { combineReducers, configureStore } from '@reduxjs/toolkit';
import auth from './auth/auth-slice';
import comments from './comments/comments-slice';
import discussions from './discussions/discussions-slice';
import error from './error/error-slice';
import organizations from './organizations/organizations-slice';
import reports from './reports/reports-slice';
import repos from './repos/repos-slice';
import tag from './tag/tag-slice';
import teams from './teams/teams-slice';
import user from './user/user-slice';

export const reducer = combineReducers({
  auth,
  comments,
  discussions,
  error,
  organizations,
  reports,
  repos,
  tag,
  teams,
  user,
});

export const store = configureStore({
  reducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Export actions
export * from './auth/auth-actions';
export { setToken } from './auth/auth-slice';
export * from './comments/comments-actions';
export { selectCommentsById, selectCommentsByParent } from './comments/comments-slice';
export * from './discussions/discussions-actions';
export { setError } from './error/error-slice';
export * from './organizations/organizations-actions';
export * from './reports/reports-actions';
export { selectActiveReport, selectActiveReports } from './reports/reports-slice';
export * from './repos/repos-actions';
export { setPageAndLimit, setProvider, setSearchQuery } from './repos/repos-slice';
export * from './tag/tag-actions';
export * from './teams/teams-actions';
export { setOrganization, selectActiveOrganization } from './organizations/organizations-slice';
export { setTeam, selectActiveTeam } from './teams/teams-slice';
export * from './user/user-actions';
export { setUser } from './user/user-slice';
