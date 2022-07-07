import { ActionWithPayload, Organization, Relations } from '@kyso-io/kyso-model';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import slugify from '../../helpers/slugify';
import { fetchRelationsAction } from '../relations/relations-actions';
import { fetchOrganizationAction, updateOrganizationAction, updateOrganizationOptionsAction } from './organizations-actions';

export type OrganizationsState = {
  activeId: string | null | undefined; // single id of active organization
  activeIds: object | null; // list of ids for showing lists of organizations
  entities: { [key: string]: Organization | null | undefined }; // all the organizations by id
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
        [action.payload!.id as string]: action.payload,
      };
      state.activeId = action.payload!.id;
    },
    resetOrganizationsSlice: () => {
      return initialState;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchOrganizationAction.fulfilled, (state: OrganizationsState, action: ActionWithPayload<Organization>) => {
      if (action.payload?.id) {
        state.entities = {
          ...state.entities,
          [action.payload!.id as string]: action.payload,
        };
        state.activeId = action.payload!.id;
      }
    });
    builder.addCase(updateOrganizationAction.fulfilled, (state: OrganizationsState, action: ActionWithPayload<Organization>) => {
      state.activeId = action.payload!.id;
      if (action.payload?.id) {
        state.entities = {
          ...state.entities,
          [action.payload!.id as string]: action.payload,
        };
      }
    });
    builder.addCase(updateOrganizationOptionsAction.fulfilled, (state: OrganizationsState, action: ActionWithPayload<Organization>) => {
      state.activeId = action.payload!.id;
      if (action.payload?.id) {
        state.entities = {
          ...state.entities,
          [action.payload!.id as string]: action.payload,
        };
      }
    });
    builder.addCase(fetchRelationsAction, (state: OrganizationsState, action: ActionWithPayload<Relations>) => {
      state.entities = {
        ...state.entities,
        ...action.payload?.organization,
      };
    });
  },
});

export const { setOrganization, resetOrganizationsSlice } = organizationsSlice.actions;

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
  if (!name) {
    return null;
  }
  return Object.values(state.organizations.entities).find((org: any /*{ name: string; sluglified_name: string }*/) => {
    return (org?.name && org.name !== '' && slugify(org.name) === name) || org?.sluglified_name === name;
  });
};

export default organizationsSlice.reducer;
