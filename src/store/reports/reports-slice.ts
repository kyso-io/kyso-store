import { ActionWithPayload, GithubFileHash, Relations, Report, ReportDTO } from '@kyso-io/kyso-model';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import listToKeyVal from '../../helpers/list-to-key-val';
import { fetchRelationsAction } from '../relations/relations-actions';
import {
  deleteReportAction,
  fetchBranchesAction,
  fetchFileContentAction,
  fetchReportAction,
  fetchReportsAction,
  fetchReportsTreeAction,
  importGithubRepositoryAction,
  toggleGlobalPinReportAction,
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
  requesting: boolean;
  deletedReport: boolean;
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
  requesting: false,
  deletedReport: false,
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
    setActiveId: (state: ReportsState, action: ActionWithPayload<string>) => {
      state.activeId = action.payload;
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
    setRequestingReports: (state: ReportsState, action: ActionWithPayload<boolean>) => {
      state.requesting = action.payload!;
    },
    setDeleteReport: (state: ReportsState, action: ActionWithPayload<boolean>) => {
      state.deletedReport = action.payload!;
    },
    resetReportsSlice: () => {
      return initialState;
    },
  },
  extraReducers: builder => {
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
    builder.addCase(toggleUserPinReportAction.fulfilled, (state: ReportsState, action: ActionWithPayload<ReportDTO>) => {
      state.entities = {
        ...state.entities,
        [action.payload!.id as string]: action.payload!,
      };
    });
    builder.addCase(toggleGlobalPinReportAction.fulfilled, (state: ReportsState, action: ActionWithPayload<ReportDTO>) => {
      state.entities = {
        ...state.entities,
        [action.payload!.id as string]: action.payload!,
      };
    });
    builder.addCase(updateReportAction.fulfilled, (state: ReportsState, action: ActionWithPayload<ReportDTO>) => {
      if (!action.payload || !action.payload.id) return;

      state.activeId = action.payload!.id;
    });
    builder.addCase(fetchBranchesAction.fulfilled, (state: ReportsState, action: ActionWithPayload<any[]>) => {
      state.branches = action.payload!;
    });
    builder.addCase(fetchReportsTreeAction.fulfilled, (state: ReportsState, action: ActionWithPayload<any>) => {
      state.tree = action.payload!;
    });
    builder.addCase(deleteReportAction.fulfilled, (state: ReportsState, action: ActionWithPayload<Report | null>) => {
      if (action?.payload) {
        state.deletedReport = true;
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

export const { setReports, setCurrentBranch, setSelectedTags, setRequestingReports, setDeleteReport, setActiveId, resetReportsSlice } = reportsSlice.actions;

export const selectActiveReport = (state: RootState): Report | null => {
  if (!state.reports.activeId) {
    return null;
  }
  if (Object.keys(state.reports.entities!).length === 0) {
    return null;
  }
  return state.reports.entities![state.reports.activeId];
};

export const selectActiveReports = (state: RootState): ReportDTO[] => {
  if (state.reports.activeIds.length === 0) {
    return [];
  }
  if (Object.keys(state.reports.entities!).length === 0) {
    return [];
  }
  const reports: ReportDTO[] = state.reports.activeIds.map((id: any) => state.reports.entities![id] as ReportDTO);
  if (state.reports.selectedTags.length === 0) {
    return reports;
  } else {
    return reports.filter((report: ReportDTO) => {
      return state.reports.selectedTags.some((tag: any) => {
        if (report && report.tags && tag) {
          return report.tags.includes(tag);
        } else {
          return [];
        }
      });
    });
  }
};

export const selectFirstSearchResult = (state: RootState): ReportDTO | null => {
  if (state.reports.activeIds.length === 0) {
    return null;
  }
  if (Object.keys(state.reports.entities!).length === 0) {
    return null;
  }
  return state.reports.entities![state.reports.activeIds[0]];
};

export const selectFileContent = (state: RootState): string | null => {
  if (!state.reports.content) {
    return null;
  }
  return Buffer.from(state.reports.content).toString('utf-8');
};

export const selectFileToRender = (state: RootState, routerPath: string): GithubFileHash | null => {
  if (!state.reports.tree) {
    return null;
  }
  const files: GithubFileHash[] = state.reports.tree.filter((item: any) => item.type === 'file');
  const fileToRender: GithubFileHash | undefined = files.find((item: any) => {
    if (routerPath) return item.path === routerPath;
  });
  return fileToRender || null;
};

export const selectFileToRenderGivenList = (state: RootState, list: string[]): GithubFileHash | null => {
  if (!state.reports.tree) {
    return null;
  }
  const validFiles: GithubFileHash[] = state.reports.tree.filter((item: any) => item.type === 'file');
  for (const element of list) {
    if (!element) {
      continue;
    }
    const fileToRender: GithubFileHash | undefined = validFiles.find((item: any) => {
      return item.path === element;
    });
    if (fileToRender) {
      return fileToRender;
    }
  }
  return null;
};

export default reportsSlice.reducer;
