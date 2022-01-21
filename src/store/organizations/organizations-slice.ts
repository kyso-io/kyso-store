import { createSlice } from '@reduxjs/toolkit';

export type OrganizationsState = {
  activeId: string | null | undefined; // single id of active organization
  activeIds: object | null; // list of ids for showing lists of organizations
  entities: { [key: string]: any | null | undefined } | null; // all the organizations by id
};

const initialState: OrganizationsState = {
  activeId: null,
  activeIds: [],
  entities: {},
};

const organizationSlice = createSlice({
  name: 'organization',
  initialState,
  reducers: {},
});

export default organizationSlice.reducer;
