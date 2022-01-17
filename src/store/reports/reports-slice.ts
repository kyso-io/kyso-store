import { createSlice } from '@reduxjs/toolkit';
import listToKeyVal from '../../helpers/list-to-key-val';
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
  activeId: string | null | undefined; // single id of active report
  allIds: object | null;  // list of ids for showing lists of reports
  entities: { [key: string]: any | null | undefined } | null; // all the reports by id
  branches: any[];
  comment_ids: string[];
  commits: any[];
  currentBranch: null;
  limit: number;
  page: number;
  pinnedReport: Report | null;
  content: any;
  searchQuery: string | null;
  tagsQuery: any[];
  tree: any;
};

const initialState: ReportsState = {
  activeId: null,
  allIds: null,
  entities: {},
  branches: [],
  comment_ids: [],
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
    setReports: (state: ReportsState, action: ActionWithPayload<any>) => {
      state.entities = {
        ...state.entities,
        ...listToKeyVal(action.payload.data)
      }
      state.allIds = action.payload.data.map((entity: Report) => entity.id)
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
    setReportsComments: (state: ReportsState, action: ActionWithPayload<any[]>) => {
      state.comment_ids = action.payload!.map((entity) => entity.id);
    },
  },
  extraReducers: builder => {
    builder.addCase(createReportAction.fulfilled, (state: ReportsState, action: ActionWithPayload<Report>) => {
      state.activeId = action.payload!.id;
    });
    builder.addCase(fetchReportAction.fulfilled, (state: ReportsState, action: ActionWithPayload<Report>) => {
      state.activeId = action.payload!.id;
      state.entities = {
        ...state.entities,
        [action.payload!.id as string]: action.payload!
      }
    });
    builder.addCase(updateReportAction.fulfilled, (state: ReportsState, action: ActionWithPayload<Report>) => {
      state.activeId = action.payload!.id;
    });
    builder.addCase(pinReportAction.fulfilled, (state: ReportsState, action: ActionWithPayload<Report>) => {
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
    builder.addCase(fetchReportCommentsAction.fulfilled, (state: ReportsState, action: ActionWithPayload<any[]>) => {
      state.comment_ids = action.payload!.map((entity) => entity.id);
    });
    builder.addCase(deleteReportAction.fulfilled, (state: ReportsState) => {
      state.activeId = null;
    });
    builder.addCase(fetchReportsAction.fulfilled, (state: ReportsState, action: ActionWithPayload<any>) => {
      state.entities = {
        ...state.entities,
        ...listToKeyVal(action.payload.data)
      }
      state.allIds = action.payload.data.map((entity: Report) => entity.id)
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
