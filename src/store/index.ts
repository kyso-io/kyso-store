import { combineReducers, configureStore } from '@reduxjs/toolkit';
import auth from './auth/auth-slice';
import comments from './comments/comments-slice';
import discussions from './discussions/discussions-slice';
import error from './error/error-slice';
import organizations from './organizations/organizations-slice';
import reports from './reports/reports-slice';
import repos from './repos/repos-slice';
import team from './team/team-slice';
import user from './user/user-slice';

export const reducer = combineReducers({
  auth,
  discussions,
  organizations,
  reports,
  repos,
  team,
  user,
  error,
  comments,
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
export { setOrganization, setTeam, setToken } from './auth/auth-slice';
export * from './comments/comments-actions';
export { selectCommentsById, selectCommentsByParent } from './comments/comments-slice';
export * from './discussions/discussions-actions';
export { setError } from './error/error-slice';
export * from './organizations/organizations-actions';
export * from './reports/reports-actions';
export { selectActiveReport } from './reports/reports-slice';
export * from './repos/repos-actions';
export { setPageAndLimit, setProvider, setSearchQuery } from './repos/repos-slice';
export * from './team/team-actions';
export * from './user/user-actions';
