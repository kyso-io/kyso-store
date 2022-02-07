import { ActionWithPayload, Comment, Relations } from '@kyso-io/kyso-model';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import listToKeyVal from '../../helpers/list-to-key-val';
import { fetchRelationsAction } from '../relations/relations-actions';
import { fetchDiscussionComments, fetchReportCommentsAction, updateCommentAction, deleteCommentAction } from './comments-actions';

export type CommentsState = {
  activeId: string | null | undefined; // single id of active report
  activeIds: string[];
  entities: { [key: string]: Comment }; // all the reports by id
}

const initialState: CommentsState = {
  activeId: null,
  activeIds: [],
  entities: {},
};

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchReportCommentsAction.fulfilled, (state: CommentsState, action: ActionWithPayload<Comment[]>) => {
      if (!action.payload) return;
      state.entities = {
        ...state.entities,
        ...listToKeyVal(action.payload),
      };
      state.activeIds = action.payload!.map((entity: Comment) => entity.id as string);
    });
    builder.addCase(fetchDiscussionComments.fulfilled, (state: CommentsState, action: ActionWithPayload<Comment[]>) => {
      if (!action.payload) return;
      state.entities = {
        ...state.entities,
        ...listToKeyVal(action.payload),
      };
      state.activeIds = action.payload!.map((entity: Comment) => entity.id as string);
    });
    builder.addCase(updateCommentAction.fulfilled, (state: CommentsState, action: ActionWithPayload<Comment>) => {
      if (!action.payload) return;
      state.entities = {
        ...state.entities,
        [action.payload.id!]: action.payload
      }
    });
    builder.addCase(deleteCommentAction.fulfilled, (state: CommentsState, action: ActionWithPayload<Comment>) => {
      if (!action.payload) return;
      const copy = Object.assign(state.entities, {})
      delete copy[action.payload.id!]
      state.entities = {
        ...state.entities,
        ...copy
      }
    });
    builder.addCase(fetchRelationsAction, (state: CommentsState, action: ActionWithPayload<Relations>) => {
      state.entities = {
        ...state.entities,
        ...action.payload?.comment,
      }
    });    
  }
});

export const selectCommentsByParent = (state: RootState, parentId: string | null = null) => {
  const values: Comment[] = Object.values(state.comments.entities!)
  if (values.length === 0) return []
  
  const filtered = values.filter((comment: Comment) => {
    return comment!.comment_id === parentId
  })
  return filtered
}

export const selectCommentsById = (state: RootState, id: string) => {
  if (id in state.comments.entities!) return state.comments.entities![id]
  return null
}

export default commentSlice.reducer;
