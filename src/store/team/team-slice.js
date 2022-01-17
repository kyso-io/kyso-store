"use strict";
exports.__esModule = true;
var toolkit_1 = require("@reduxjs/toolkit");
var team_actions_1 = require("./team-actions");
var initialState = {
    team: null
};
var teamSlice = (0, toolkit_1.createSlice)({
    name: 'team',
    initialState: initialState,
    reducers: {
        setTeam: function (state, action) {
            state.team = action.payload;
        }
    },
    extraReducers: function (builder) {
        builder.addCase(team_actions_1.fetchTeamAction.fulfilled, function (state, action) {
            state.team = action.payload;
        });
    }
});
exports["default"] = teamSlice.reducer;
