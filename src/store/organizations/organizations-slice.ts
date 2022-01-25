import { createSlice } from '@reduxjs/toolkit';
import { Organization, ActionWithPayload } from '@kyso-io/kyso-model';
import { RootState } from '..';

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

const organizationsSlice = createSlice({
  name: 'organization',
  initialState,
  reducers: {
      setOrganization: (state: OrganizationsState, action: ActionWithPayload<Organization>) => {
        state.entities = {
          ...state.entities,
          [action.payload!.id as string]: action.payload
        };
        state.activeId = action.payload!.id
      },
  }
});

export const { setOrganization } = organizationsSlice.actions;

export const selectActiveOrganization = (state: RootState) => {
  if (!state.organizations.activeId) return null;
  if (state.organizations.entities!.length === 0) return null;
  return state.organizations.entities![state.organizations.activeId];
};

export const selectOrganizationById = (state: RootState, id: string) => {
  if (state.organizations.entities!.length === 0) return null;
  return state.organizations.entities![id];
};

export default organizationsSlice.reducer;
