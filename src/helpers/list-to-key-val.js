"use strict";
exports.__esModule = true;
exports["default"] = (function (data) {
    return data.reduce(function (prev, curr) {
        prev[curr.id] = curr;
        return prev;
    }, {});
});
