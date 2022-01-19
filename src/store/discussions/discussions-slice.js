"use strict";
exports.__esModule = true;
var toolkit_1 = require("@reduxjs/toolkit");
var discussions_actions_1 = require("./discussions-actions");
var initialState = {
    list: [],
    limit: 20,
    page: 1
};
var discussionsSlice = (0, toolkit_1.createSlice)({
    name: 'discussions',
    initialState: initialState,
    reducers: {
        setDiscussions: function (state, action) {
            state.list = action.payload;
        },
        setPageAndLimit: function (state, action) {
            var _a, _b;
            state.page = ((_a = action.payload) === null || _a === void 0 ? void 0 : _a.page) || initialState.page;
            state.limit = ((_b = action.payload) === null || _b === void 0 ? void 0 : _b.limit) || initialState.limit;
        }
    },
    extraReducers: function (builder) {
        builder.addCase(discussions_actions_1.fetchDiscussionsAction.fulfilled, function (state, action) {
            state.list = action.payload;
        });
    }
});
exports["default"] = discussionsSlice.reducer;
