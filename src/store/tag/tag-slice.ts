import { ActionWithPayload, Tag } from '@kyso-io/kyso-model';
import { createSlice } from '@reduxjs/toolkit';

export type TagState = {
  tags: Tag[];
};

const initialState: TagState = {
  tags: [],
};

const tagSlice = createSlice({
  name: 'tag',
  initialState,
  reducers: {
    setTags: (state, action: ActionWithPayload<Tag[]>) => {
      state.tags = action.payload!;
    },
  },
});


export default tagSlice.reducer;