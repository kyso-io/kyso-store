import { createSlice } from '@reduxjs/toolkit';
import { ActionWithPayload } from '../../types/action-with-payload';
import { fetchRelationsAction } from '../relations/relations-actions'
import { Comment } from '@kyso-io/kyso-model'
import { fetchReportCommentsAction } from './comments-actions';
import { Relation } from '../../types/relations';
import { RootState } from '..';

export type CommentsState = {
  activeId: string | null | undefined; // single id of active report
  activeIds: object | null;  // list of ids for showing lists of reports
  entities: { [key: string]: any | null | undefined } | null; // all the reports by id
}

const initialState: CommentsState = {
  activeId: null,
  activeIds: [],
  entities: {}
};

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchReportCommentsAction.fulfilled, (state: CommentsState, action: ActionWithPayload<Comment[]>) => {
      state.activeIds = action.payload!.map((entity) => entity.id);
    });
    builder.addCase(fetchRelationsAction, (state: CommentsState, action: ActionWithPayload<Relation>) => {
      state.entities = {
        ...state.entities,
        ...action.payload?.comment,
      }
    });    
  }
});

export const selectCommentsByParent = (state: RootState, parentId: string | null) => {
  const values = Object.values(state.comments.entities!)
  if (values.length === 0) return []
  const filtered = values.filter((comment: Comment) => comment.comment_id === parentId)
  return filtered
}

export const selectCommentsById = (state: RootState, id: string) => {
  if (id in state.comments.entities!) return state.comments.entities![id]
}

export default commentSlice.reducer;
