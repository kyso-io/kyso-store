"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var toolkit_1 = require("@reduxjs/toolkit");
var relations_actions_1 = require("../relations/relations-actions");
var comments_actions_1 = require("./comments-actions");
var initialState = {
    activeId: null,
    activeIds: [],
    entities: []
};
var commentSlice = (0, toolkit_1.createSlice)({
    name: 'team',
    initialState: initialState,
    reducers: {},
    extraReducers: function (builder) {
        builder.addCase(comments_actions_1.fetchReportCommentsAction.fulfilled, function (state, action) {
            state.activeIds = action.payload.map(function (entity) { return entity.id; });
        });
        builder.addCase(relations_actions_1.fetchRelationsAction, function (state, action) {
            var _a;
            state.entities = __assign(__assign({}, state.entities), (_a = action.payload) === null || _a === void 0 ? void 0 : _a.comment);
        });
    }
});
exports["default"] = commentSlice.reducer;
