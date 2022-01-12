import { Action } from '@reduxjs/toolkit';

export type ActionWithPayload<T> = {
  payload: T | null;
} & Action;
