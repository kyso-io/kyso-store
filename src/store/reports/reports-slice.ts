import { createSlice } from '@reduxjs/toolkit';
import { ActionWithPayload } from '../../types/action-with-payload';
import { Report } from '../../types/report';
import {
  createReportAction,
  deleteReportAction,
  fetchBranchesAction,
  fetchCommitsAction,
  fetchFileContentsAction,
  fetchPinnedReportAction,
  fetchReportAction,
  fetchReportCommentsAction,
  fetchReportsAction,
  fetchReposTreeAction,
  pinReportAction,
  updateReportAction,
} from './reports-actions';

export type ReportsState = {
  active: Report | null;
  branches: any[];
  comments: any[];
  commits: any[];
  currentBranch: null;
  list: Report[];
  relations: object;
  limit: number;
  page: number;
  pinnedReport: Report | null;
  content: any;
  searchQuery: string | null;
  tagsQuery: any[];
  tree: any;
};

const initialState: ReportsState = {
  active: null,
  branches: [],
  comments: [],
  commits: [],
  currentBranch: null,
  list: [],
  relations: {},
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
    setReports: (state: ReportsState, action: ActionWithPayload<Report[]>) => {
      state.list = action.payload!;
    },
    setRelations: (state: ReportsState, action) => {
      state.relations = action.payload!;
    },
    setPinnedReport: (state: ReportsState, action: ActionWithPayload<Report>) => {
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
    setReport: (state: ReportsState, action: ActionWithPayload<Report>) => {
      state.active = action.payload!;
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
    setReportsComments: (state: ReportsState, action: ActionWithPayload<any[]>) => {
      state.comments = action.payload!;
    },
  },
  extraReducers: builder => {
    builder.addCase(createReportAction.fulfilled, (state: ReportsState, action: ActionWithPayload<Report>) => {
      state.active = action.payload!;
    });
    builder.addCase(fetchReportAction.fulfilled, (state: ReportsState, action: ActionWithPayload<Report>) => {
      state.active = action.payload!;
    });
    builder.addCase(updateReportAction.fulfilled, (state: ReportsState, action: ActionWithPayload<Report>) => {
      state.active = action.payload!;
    });
    builder.addCase(pinReportAction.fulfilled, (state: ReportsState, action: ActionWithPayload<Report>) => {
      state.active = action.payload!;
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
    builder.addCase(fetchReportCommentsAction.fulfilled, (state: ReportsState, action: ActionWithPayload<any[]>) => {
      state.comments = action.payload!;
    });
    builder.addCase(deleteReportAction.fulfilled, (state: ReportsState) => {
      state.active = null;
    });
    builder.addCase(fetchReportsAction.fulfilled, (state: ReportsState, action: ActionWithPayload<any>) => {
      state.list = action.payload.data;
      state.relations = action.payload.relations;
    });
    builder.addCase(fetchPinnedReportAction.fulfilled, (state: ReportsState, action: ActionWithPayload<Report>) => {
      state.pinnedReport = action.payload!;
    });
    builder.addCase(fetchFileContentsAction.fulfilled, (state: ReportsState, action: ActionWithPayload<any>) => {
      state.content = action.payload!;
    });
  },
});

export const { setReports, setCurrentBranch, setPageAndLimit, setSearchQuery, setTagsQuery } = reportsSlice.actions;

export default reportsSlice.reducer;
