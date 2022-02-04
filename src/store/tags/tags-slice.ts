import { ActionWithPayload, Tag } from '@kyso-io/kyso-model';
import { createSlice } from '@reduxjs/toolkit';

export type TagState = {
  tags: Tag[];
};

const initialState: TagState = {
  tags: [],
};

const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    setTags: (state, action: ActionWithPayload<Tag[]>) => {
      state.tags = action.payload!;
    },
  },
});


export default tagsSlice.reducer;