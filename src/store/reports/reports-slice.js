"use strict";
var _a;
exports.__esModule = true;
exports.setTagsQuery = exports.setSearchQuery = exports.setPageAndLimit = exports.setCurrentBranch = exports.setReports = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var reports_actions_1 = require("./reports-actions");
var initialState = {
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
    tree: null
};
var reportsSlice = (0, toolkit_1.createSlice)({
    name: 'reports',
    initialState: initialState,
    reducers: {
        setReports: function (state, action) {
            state.list = action.payload;
        },
        setRelations: function (state, action) {
            state.relations = action.payload;
        },
        setPinnedReport: function (state, action) {
            state.pinnedReport = action.payload;
        },
        setContent: function (state, action) {
            state.content = action.payload;
        },
        setPageAndLimit: function (state, action) {
            var _a, _b;
            state.page = ((_a = action.payload) === null || _a === void 0 ? void 0 : _a.page) || initialState.page;
            state.limit = ((_b = action.payload) === null || _b === void 0 ? void 0 : _b.limit) || initialState.limit;
        },
        setSearchQuery: function (state, action) {
            state.searchQuery = action.payload;
        },
        setTagsQuery: function (state, action) {
            state.tagsQuery = action.payload;
        },
        setReport: function (state, action) {
            state.active = action.payload;
        },
        setBranches: function (state, action) {
            state.branches = action.payload;
        },
        setCommits: function (state, action) {
            state.commits = action.payload;
        },
        setTree: function (state, action) {
            state.tree = action.payload;
        },
        setCurrentBranch: function (state, action) {
            state.currentBranch = action.payload;
        },
        setReportsComments: function (state, action) {
            state.comments = action.payload;
        }
    },
    extraReducers: function (builder) {
        builder.addCase(reports_actions_1.createReportAction.fulfilled, function (state, action) {
            state.active = action.payload;
        });
        builder.addCase(reports_actions_1.fetchReportAction.fulfilled, function (state, action) {
            state.active = action.payload;
        });
        builder.addCase(reports_actions_1.updateReportAction.fulfilled, function (state, action) {
            state.active = action.payload;
        });
        builder.addCase(reports_actions_1.pinReportAction.fulfilled, function (state, action) {
            state.active = action.payload;
        });
        builder.addCase(reports_actions_1.fetchBranchesAction.fulfilled, function (state, action) {
            state.branches = action.payload;
        });
        builder.addCase(reports_actions_1.fetchCommitsAction.fulfilled, function (state, action) {
            state.commits = action.payload;
        });
        builder.addCase(reports_actions_1.fetchReposTreeAction.fulfilled, function (state, action) {
            state.tree = action.payload;
        });
        builder.addCase(reports_actions_1.fetchReportCommentsAction.fulfilled, function (state, action) {
            state.comments = action.payload;
        });
        builder.addCase(reports_actions_1.deleteReportAction.fulfilled, function (state) {
            state.active = null;
        });
        builder.addCase(reports_actions_1.fetchReportsAction.fulfilled, function (state, action) {
            state.list = action.payload.data;
            state.relations = action.payload.relations;
        });
        builder.addCase(reports_actions_1.fetchPinnedReportAction.fulfilled, function (state, action) {
            state.pinnedReport = action.payload;
        });
        builder.addCase(reports_actions_1.fetchFileContentsAction.fulfilled, function (state, action) {
            state.content = action.payload;
        });
    }
});
exports.setReports = (_a = reportsSlice.actions, _a.setReports), exports.setCurrentBranch = _a.setCurrentBranch, exports.setPageAndLimit = _a.setPageAndLimit, exports.setSearchQuery = _a.setSearchQuery, exports.setTagsQuery = _a.setTagsQuery;
exports["default"] = reportsSlice.reducer;
