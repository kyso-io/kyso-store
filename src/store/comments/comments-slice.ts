import { createSlice } from '@reduxjs/toolkit';
import { ActionWithPayload } from '../../types/action-with-payload';
import { fetchRelationsAction } from '../relations/relations-actions'

import { fetchReportCommentsAction } from './comments-actions';

export type CommentsState = {
  activeId: string | null | undefined; // single id of active report
  activeIds: object | null;  // list of ids for showing lists of reports
  entities: { [key: string]: any | null | undefined } | null; // all the reports by id
}

const initialState: CommentsState = {
  activeId: null,
  activeIds: [],
  entities: []
};

const commentSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchReportCommentsAction.fulfilled, (state: CommentsState, action: ActionWithPayload<any[]>) => {
      state.activeIds = action.payload!.map((entity) => entity.id);
    });
    builder.addCase(fetchRelationsAction, (state: CommentsState, action: ActionWithPayload<any>) => {
      state.entities = {
        ...state.entities,
        ...action.payload?.comment,
      }
    });    
  }

});

export default commentSlice.reducer;
