import { configureStore } from '@reduxjs/toolkit';
import auth from './auth/auth-slice';
import discussions from './discussions/discussions-slice';
import reports from './reports/reports-slice';
import repos from './repos/repos-slice';
import team from './team/team-slice';
import user from './user/user-slice';

export const store = configureStore({
  reducer: {
    auth,
    discussions,
    reports,
    repos,
    team,
    user,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Export actions
export * from './auth/auth-actions';
export * from './discussions/discussions-actions';
export * from './reports/reports-actions';
export * from './repos/repos-actions';
export * from './team/team-actions';
export * from './user/user-actions';
