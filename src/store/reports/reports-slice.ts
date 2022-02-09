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
  fetchReportsTreeAction,
  importGithubRepositoryAction,
  toggleUserPinReportAction,
  toggleUserStarReportAction,
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
  selectedTags: string[];
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
  selectedTags: [],
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
    setSelectedTags: (state: ReportsState, action: ActionWithPayload<string[]>) => {
      state.selectedTags = action.payload!;
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
    builder.addCase(toggleUserStarReportAction.fulfilled, (state: ReportsState, action: ActionWithPayload<ReportDTO>) => {
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
    builder.addCase(fetchReportsTreeAction.fulfilled, (state: ReportsState, action: ActionWithPayload<any>) => {
      state.tree = action.payload!;
    });
    builder.addCase(deleteReportAction.fulfilled, (state: ReportsState, action: ActionWithPayload<ReportDTO | null>) => {
      if (action?.payload) {
        const entities = { ...state.entities };
        // eslint-disable-next-line no-prototype-builtins
        if (entities.hasOwnProperty(action.payload.id!)) {
          delete entities[action.payload.id!];
        }
        if (state.activeId === action.payload.id!) {
          state.activeId = null;
        }
        state.entities = entities;
      }
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
    builder.addCase(importGithubRepositoryAction.fulfilled, (state: ReportsState, action: ActionWithPayload<ReportDTO | null>) => {
      const entities = { ...state.entities };
      if (action?.payload) {
        entities[action.payload.id!] = action.payload;
      }
      state.entities = entities;
    });
  },
});

export const { setReports, setCurrentBranch, setSelectedTags } = reportsSlice.actions;

export const selectActiveReport = (state: RootState) => {
  if (!state.reports.activeId) return null;
  if (Object.keys(state.reports.entities!).length === 0) return null;
  return state.reports.entities![state.reports.activeId];
};

export const selectActiveReports = (state: RootState) => {
  if (state.reports.activeIds.length === 0) return null;
  if (Object.keys(state.reports.entities!).length === 0) return null;
  const reports: ReportDTO[] = state.reports.activeIds.map(id => state.reports.entities![id] as ReportDTO);
  if (state.reports.selectedTags.length === 0) {
    return reports;
  } else {
    return reports.filter((report: ReportDTO) => {
      return state.reports.selectedTags.some(tag => report.tags.includes(tag));
    });
  }
};

export const selectFirstSearchResult = (state: RootState) => {
  if (state.reports.activeIds.length === 0) return null;
  if (Object.keys(state.reports.entities!).length === 0) return null;
  return state.reports.entities![state.reports.activeIds[0]];
};

export const selectFileContent = (state: RootState) => {
  if (state.reports.content) return Buffer.from(state.reports.content).toString('utf-8');
};

export const selectFileToRender = (state: RootState, routerPath: string) => {
  if (!state.reports.tree) return;
  const files = state.reports.tree.filter((item: any) => item.type === 'file');
  const fileToRender = files.find((item: any) => {
    if (routerPath) return item.path === routerPath;
    // return item.path.endsWith('.ipynb') || item.path.endsWith('.md')
  });

  return fileToRender;
};

export default reportsSlice.reducer;
