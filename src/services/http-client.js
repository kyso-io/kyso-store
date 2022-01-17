"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
var store_1 = require("../store");
var httpClient = axios_1["default"].create({
    baseURL: process.env.API_URL,
    headers: { 'Content-Type': 'application/json' }
});
httpClient.interceptors.request.use(function (config) {
    var token = store_1.store.getState().auth.token;
    if (token) {
        config.headers.Authorization = "Bearer ".concat(token);
    }
    var team = store_1.store.getState().auth.team;
    if (team) {
        config.headers['x-kyso-team'] = team;
    }
    var organization = store_1.store.getState().auth.organization;
    if (organization) {
        config.headers['x-kyso-organization'] = organization;
    }
    return config;
});
httpClient.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});
exports["default"] = httpClient;
