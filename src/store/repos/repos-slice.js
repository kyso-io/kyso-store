"use strict";
var _a;
exports.__esModule = true;
exports.setPageAndLimit = exports.setProvider = exports.setSearchQuery = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var login_provider_enum_1 = require("../../enums/login-provider.enum");
var repos_actions_1 = require("./repos-actions");
var initialState = {
    list: [],
    limit: 20,
    page: 1,
    active: null,
    searchQuery: null,
    provider: login_provider_enum_1.LoginProviderEnum.GITHUB,
    branches: [],
    currentBranch: null,
    commits: [],
    tree: null
};
var reposSlice = (0, toolkit_1.createSlice)({
    name: 'repos',
    initialState: initialState,
    reducers: {
        setRepos: function (state, action) {
            state.list = action.payload;
        },
        setRepo: function (state, action) {
            state.active = action.payload;
        },
        setPageAndLimit: function (state, action) {
            var _a, _b;
            state.page = ((_a = action.payload) === null || _a === void 0 ? void 0 : _a.page) || initialState.page;
            state.limit = ((_b = action.payload) === null || _b === void 0 ? void 0 : _b.limit) || initialState.limit;
        },
        setSearchQuery: function (state, action) {
            state.searchQuery = action.payload;
        },
        setProvider: function (state, action) {
            state.provider = action.payload;
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
        }
    },
    extraReducers: function (builder) {
        builder.addCase(repos_actions_1.fetchReposAction.fulfilled, function (state, action) {
            state.list = action.payload;
        });
        builder.addCase(repos_actions_1.fetchRepoAction.fulfilled, function (state, action) {
            state.active = action.payload;
        });
        builder.addCase(repos_actions_1.fetchRepoTreeAction.rejected, function (state, action) {
            state.tree = action.payload;
        });
    }
});
exports.setSearchQuery = (_a = reposSlice.actions, _a.setSearchQuery), exports.setProvider = _a.setProvider, exports.setPageAndLimit = _a.setPageAndLimit;
exports["default"] = reposSlice.reducer;
