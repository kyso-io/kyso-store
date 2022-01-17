"use strict";
exports.__esModule = true;
exports.setToken = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var auth_actions_1 = require("./auth-actions");
var initialState = {
    token: null
};
var authSlice = (0, toolkit_1.createSlice)({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setToken: function (state, action) {
            state.token = action.payload;
        }
    },
    extraReducers: function (builder) {
        builder.addCase(auth_actions_1.loginAction.fulfilled, function (state, action) {
            state.token = action.payload;
        });
    }
});
exports.setToken = authSlice.actions.setToken;
exports["default"] = authSlice.reducer;
