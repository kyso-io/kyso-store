"use strict";
exports.__esModule = true;
var toolkit_1 = require("@reduxjs/toolkit");
var user_actions_1 = require("./user-actions");
var initialState = {
    user: null
};
var userSlice = (0, toolkit_1.createSlice)({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUser: function (state, action) {
            state.user = action.payload;
        }
    },
    extraReducers: function (builder) {
        builder.addCase(user_actions_1.refreshUserAction.fulfilled, function (state, action) {
            state.user = action.payload;
        });
        builder.addCase(user_actions_1.updateUserAction.fulfilled, function (state, action) {
            state.user = action.payload;
        });
    }
});
exports["default"] = userSlice.reducer;
