import { ActionWithPayload, Relations, ReportDTO } from '@kyso-io/kyso-model';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import listToKeyVal from '../../helpers/list-to-key-val';
import { fetchRelationsAction } from '../relations/relations-actions';
import {
  createReportAction,
  deleteReportAction,
  fetchBranchesAction,
  fetchCommitsAction,
  fetchFileContentAction,
  fetchReportAction,
  fetchReportsAction,
  fetchReposTreeAction,
  toggleUserPinReportAction,
  updateReportAction,
} from './reports-actions';

export type ReportsState = {
  activeId: string | null | undefined; // single id of active report
  activeIds: string[];
  entities: { [key: string]: ReportDTO | null | undefined } | null; // all the reports by id
  branches: any[];
  commits: any[];
  currentBranch: null;
  limit: number;
  page: number;
  pinnedReport: ReportDTO | null;
  content: any;
  searchQuery: string | null;
  tagsQuery: any[];
  tree: any;
};

const initialState: ReportsState = {
  activeId: null,
  activeIds: [],
  entities: {},
  branches: [],
  commits: [],
  currentBranch: null,
  limit: 20,
  page: 1,
  pinnedReport: null,
  content: null,
  searchQuery: null,
  tagsQuery: [],
  tree: null,
};

const reportsSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    setReports: (state: ReportsState, action: ActionWithPayload<ReportDTO[]>) => {
      state.entities = {
        ...state.entities,
        ...listToKeyVal(action.payload),
      };
      state.activeIds = action.payload!.map((entity: ReportDTO) => entity.id as string);
    },
    setPinnedReport: (state: ReportsState, action: ActionWithPayload<ReportDTO>) => {
      state.pinnedReport = action.payload!;
    },
    setContent: (state: ReportsState, action: ActionWithPayload<any>) => {
      state.content = action.payload!;
    },
    setPageAndLimit: (state: ReportsState, action: ActionWithPayload<{ page?: number; limit?: number }>) => {
      state.page = action.payload?.page || initialState.page;
      state.limit = action.payload?.limit || initialState.limit;
    },
    setSearchQuery: (state: ReportsState, action: ActionWithPayload<string | null>) => {
      state.searchQuery = action.payload;
    },
    setTagsQuery: (state: ReportsState, action: ActionWithPayload<any[]>) => {
      state.tagsQuery = action.payload!;
    },
    setReport: (state: ReportsState, action: ActionWithPayload<ReportDTO>) => {
      state.activeId = action.payload!.id;
    },
    setBranches: (state: ReportsState, action: ActionWithPayload<any[]>) => {
      state.branches = action.payload!;
    },
    setCommits: (state: ReportsState, action: ActionWithPayload<any[]>) => {
      state.commits = action.payload!;
    },
    setTree: (state: ReportsState, action: ActionWithPayload<any>) => {
      state.tree = action.payload;
    },
    setCurrentBranch: (state: ReportsState, action: ActionWithPayload<any>) => {
      state.currentBranch = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(createReportAction.fulfilled, (state: ReportsState, action: ActionWithPayload<ReportDTO>) => {
      state.activeId = action.payload!.id;
    });
    builder.addCase(fetchReportAction.fulfilled, (state: ReportsState, action: ActionWithPayload<ReportDTO>) => {
      state.activeId = action.payload!.id;
      state.entities = {
        ...state.entities,
        [action.payload!.id as string]: action.payload!,
      };
    });
    builder.addCase(updateReportAction.fulfilled, (state: ReportsState, action: ActionWithPayload<ReportDTO>) => {
      state.activeId = action.payload!.id;
    });
    builder.addCase(toggleUserPinReportAction.fulfilled, (state: ReportsState, action: ActionWithPayload<ReportDTO>) => {
      state.activeId = action.payload!.id;
    });
    builder.addCase(fetchBranchesAction.fulfilled, (state: ReportsState, action: ActionWithPayload<any[]>) => {
      state.branches = action.payload!;
    });
    builder.addCase(fetchCommitsAction.fulfilled, (state: ReportsState, action: ActionWithPayload<any[]>) => {
      state.commits = action.payload!;
    });
    builder.addCase(fetchReposTreeAction.fulfilled, (state: ReportsState, action: ActionWithPayload<any>) => {
      state.tree = action.payload!;
    });
    builder.addCase(deleteReportAction.fulfilled, (state: ReportsState) => {
      state.activeId = null;
    });
    builder.addCase(fetchReportsAction.fulfilled, (state: ReportsState, action: ActionWithPayload<ReportDTO[]>) => {
      if (!action.payload) return;
      state.entities = {
        ...state.entities,
        ...listToKeyVal(action.payload),
      };
      state.activeIds = action.payload!.map((entity: ReportDTO) => entity.id as string);
    });
    builder.addCase(fetchFileContentAction.fulfilled, (state: ReportsState, action: ActionWithPayload<any>) => {
      state.content = action.payload!;
    });
    builder.addCase(fetchRelationsAction, (state: ReportsState, action: ActionWithPayload<Relations>) => {
      // needs to be type relation
      state.entities = {
        ...state.entities,
        ...action.payload?.report,
      };
    });
  },
});

export const { setReports, setCurrentBranch, setTagsQuery } = reportsSlice.actions;

export const selectActiveReport = (state: RootState) => {
  if (!state.reports.activeId) return null;
  if (Object.keys(state.reports.entities!).length === 0) return null;
  return state.reports.entities![state.reports.activeId];
};

export const selectActiveReports = (state: RootState) => {
  if (state.reports.activeIds.length === 0) return null;
  if (Object.keys(state.reports.entities!).length === 0) return null;
  return state.reports.activeIds.map(id => state.reports.entities![id]);
};

export const selectFirstSearchResult = (state: RootState) => {
  if (state.reports.activeIds.length === 0) return null;
  if (Object.keys(state.reports.entities!).length === 0) return null;
  return state.reports.entities![state.reports.activeIds[0]];
};

export default reportsSlice.reducer;
