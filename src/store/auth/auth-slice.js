"use strict";
var _a;
exports.__esModule = true;
exports.setOrganization = exports.setTeam = exports.setToken = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var auth_actions_1 = require("./auth-actions");
var initialState = {
    token: null,
    team: null,
    organization: null
};
var authSlice = (0, toolkit_1.createSlice)({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setToken: function (state, action) {
            state.token = action.payload;
        },
        setTeam: function (state, action) {
            state.team = action.payload;
        },
        setOrganization: function (state, action) {
            state.organization = action.payload;
        }
    },
    extraReducers: function (builder) {
        builder.addCase(auth_actions_1.loginAction.fulfilled, function (state, action) {
            state.token = action.payload;
        });
    }
});
exports.setToken = (_a = authSlice.actions, _a.setToken), exports.setTeam = _a.setTeam, exports.setOrganization = _a.setOrganization;
exports["default"] = authSlice.reducer;
