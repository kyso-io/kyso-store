import { createSlice } from '@reduxjs/toolkit';
import { Relations, Organization, ActionWithPayload } from '@kyso-io/kyso-model';
import { fetchRelationsAction } from '../relations/relations-actions'
import { RootState } from '..';
import slugify from '../../helpers/slugify';

export type OrganizationsState = {
  activeId: string | null | undefined; // single id of active organization
  activeIds: object | null; // list of ids for showing lists of organizations
  entities: { [key: string]: any | null | undefined }; // all the organizations by id
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
  },
  extraReducers: builder => {
    builder.addCase(fetchRelationsAction, (state: OrganizationsState, action: ActionWithPayload<Relations>) => {
      state.entities = {
        ...state.entities,
        ...action.payload?.organization,
      }
    });    
  },

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

export const selectOrganizationBySlugifiedName = (state: RootState, name: string) => {
  return Object.values(state.organizations.entities).find((org: { name: string }) => {
    return slugify(org.name) === name
  });
};

export default organizationsSlice.reducer;
