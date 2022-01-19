"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
exports.__esModule = true;
exports.setSearchQuery = exports.setProvider = exports.setPageAndLimit = exports.setTeam = exports.setOrganization = exports.setToken = exports.store = exports.reducer = void 0;
var redux_1 = require("redux");
var toolkit_1 = require("@reduxjs/toolkit");
var auth_slice_1 = require("./auth/auth-slice");
var discussions_slice_1 = require("./discussions/discussions-slice");
var reports_slice_1 = require("./reports/reports-slice");
var repos_slice_1 = require("./repos/repos-slice");
var team_slice_1 = require("./team/team-slice");
var user_slice_1 = require("./user/user-slice");
var comments_slice_1 = require("./comments/comments-slice");
exports.reducer = (0, redux_1.combineReducers)({
    auth: auth_slice_1["default"],
    discussions: discussions_slice_1["default"],
    reports: reports_slice_1["default"],
    repos: repos_slice_1["default"],
    team: team_slice_1["default"],
    user: user_slice_1["default"],
    comments: comments_slice_1["default"]
});
exports.store = (0, toolkit_1.configureStore)({
    reducer: {
        auth: auth_slice_1["default"],
        discussions: discussions_slice_1["default"],
        reports: reports_slice_1["default"],
        repos: repos_slice_1["default"],
        team: team_slice_1["default"],
        user: user_slice_1["default"],
        comments: comments_slice_1["default"]
    }
});
// Export actions
__exportStar(require("./auth/auth-actions"), exports);
var auth_slice_2 = require("./auth/auth-slice");
__createBinding(exports, auth_slice_2, "setToken");
__createBinding(exports, auth_slice_2, "setOrganization");
__createBinding(exports, auth_slice_2, "setTeam");
__exportStar(require("./discussions/discussions-actions"), exports);
__exportStar(require("./reports/reports-actions"), exports);
__exportStar(require("./repos/repos-actions"), exports);
var repos_slice_2 = require("./repos/repos-slice");
__createBinding(exports, repos_slice_2, "setPageAndLimit");
__createBinding(exports, repos_slice_2, "setProvider");
__createBinding(exports, repos_slice_2, "setSearchQuery");
__exportStar(require("./team/team-actions"), exports);
__exportStar(require("./user/user-actions"), exports);
__exportStar(require("./comments/comments-actions"), exports);
