"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.fetchFileContentsAction = exports.fetchPinnedReportAction = exports.fetchReportsAction = exports.deleteReportAction = exports.fetchReportCommentsAction = exports.fetchReposTreeAction = exports.fetchCommitsAction = exports.fetchBranchesAction = exports.pinReportAction = exports.updateReportAction = exports.fetchReportAction = exports.createReportAction = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var http_client_1 = require("../../services/http-client");
exports.createReportAction = (0, toolkit_1.createAsyncThunk)('reports/createReport', function (paths, _a) {
    if (paths === void 0) { paths = []; }
    var getState = _a.getState;
    return __awaiter(void 0, void 0, void 0, function () {
        var repos_1, reports, url, axiosResponse, _b;
        var _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 2, , 3]);
                    repos_1 = getState().repos;
                    reports = void 0;
                    if (paths.length > 0) {
                        reports = paths.map(function (path) { return ({
                            src: {
                                provider: repos_1.provider,
                                owner: repos_1.active.owner,
                                name: repos_1.active.name,
                                default_branch: repos_1.active.default_branch,
                                path: path
                            }
                        }); });
                    }
                    else {
                        reports = {
                            src: {
                                provider: repos_1.provider,
                                owner: repos_1.active.owner,
                                name: repos_1.active.name,
                                default_branch: repos_1.active.default_branch
                            }
                        };
                    }
                    url = '/reports';
                    return [4 /*yield*/, http_client_1["default"].post(url, reports)];
                case 1:
                    axiosResponse = _d.sent();
                    if ((_c = axiosResponse === null || axiosResponse === void 0 ? void 0 : axiosResponse.data) === null || _c === void 0 ? void 0 : _c.data) {
                        return [2 /*return*/, axiosResponse.data.data];
                    }
                    else {
                        return [2 /*return*/, null];
                    }
                    return [3 /*break*/, 3];
                case 2:
                    _b = _d.sent();
                    return [2 /*return*/, null];
                case 3: return [2 /*return*/];
            }
        });
    });
});
exports.fetchReportAction = (0, toolkit_1.createAsyncThunk)('reports/fetchReport', function (payload) { return __awaiter(void 0, void 0, void 0, function () {
    var url, axiosResponse, _a;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                url = "/reports/".concat(payload.owner, "/").concat(payload.reportName);
                return [4 /*yield*/, http_client_1["default"].get(url)];
            case 1:
                axiosResponse = _c.sent();
                if ((_b = axiosResponse === null || axiosResponse === void 0 ? void 0 : axiosResponse.data) === null || _b === void 0 ? void 0 : _b.data) {
                    return [2 /*return*/, axiosResponse.data.data];
                }
                else {
                    return [2 /*return*/, null];
                }
                return [3 /*break*/, 3];
            case 2:
                _a = _c.sent();
                return [2 /*return*/, null];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.updateReportAction = (0, toolkit_1.createAsyncThunk)('reports/updateReport', function (payload) { return __awaiter(void 0, void 0, void 0, function () {
    var url, axiosResponse, _a;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                url = "/reports/".concat(payload.owner, "/").concat(payload.reportName);
                return [4 /*yield*/, http_client_1["default"].patch(url, payload.data)];
            case 1:
                axiosResponse = _c.sent();
                if ((_b = axiosResponse === null || axiosResponse === void 0 ? void 0 : axiosResponse.data) === null || _b === void 0 ? void 0 : _b.data) {
                    return [2 /*return*/, axiosResponse.data.data];
                }
                else {
                    return [2 /*return*/, null];
                }
                return [3 /*break*/, 3];
            case 2:
                _a = _c.sent();
                return [2 /*return*/, null];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.pinReportAction = (0, toolkit_1.createAsyncThunk)('reports/pinReport', function (payload) { return __awaiter(void 0, void 0, void 0, function () {
    var url, axiosResponse, _a;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                url = "/reports/".concat(payload.owner, "/").concat(payload.reportName, "/pin");
                return [4 /*yield*/, http_client_1["default"].post(url)];
            case 1:
                axiosResponse = _c.sent();
                if ((_b = axiosResponse === null || axiosResponse === void 0 ? void 0 : axiosResponse.data) === null || _b === void 0 ? void 0 : _b.data) {
                    return [2 /*return*/, axiosResponse.data.data];
                }
                else {
                    return [2 /*return*/, null];
                }
                return [3 /*break*/, 3];
            case 2:
                _a = _c.sent();
                return [2 /*return*/, null];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.fetchBranchesAction = (0, toolkit_1.createAsyncThunk)('reports/fetchBranches', function (payload) { return __awaiter(void 0, void 0, void 0, function () {
    var url, axiosResponse, _a;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                url = "/reports/".concat(payload.owner, "/").concat(payload.reportName, "/branches");
                return [4 /*yield*/, http_client_1["default"].get(url)];
            case 1:
                axiosResponse = _c.sent();
                if ((_b = axiosResponse === null || axiosResponse === void 0 ? void 0 : axiosResponse.data) === null || _b === void 0 ? void 0 : _b.data) {
                    return [2 /*return*/, axiosResponse.data.data];
                }
                else {
                    return [2 /*return*/, null];
                }
                return [3 /*break*/, 3];
            case 2:
                _a = _c.sent();
                return [2 /*return*/, null];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.fetchCommitsAction = (0, toolkit_1.createAsyncThunk)('reports/fetchCommits', function (payload) { return __awaiter(void 0, void 0, void 0, function () {
    var url, axiosResponse, _a;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                url = "/reports/".concat(payload.owner, "/").concat(payload.reportName, "/").concat(payload.branch, "/commits");
                return [4 /*yield*/, http_client_1["default"].get(url)];
            case 1:
                axiosResponse = _c.sent();
                if ((_b = axiosResponse === null || axiosResponse === void 0 ? void 0 : axiosResponse.data) === null || _b === void 0 ? void 0 : _b.data) {
                    return [2 /*return*/, axiosResponse.data.data];
                }
                else {
                    return [2 /*return*/, null];
                }
                return [3 /*break*/, 3];
            case 2:
                _a = _c.sent();
                return [2 /*return*/, null];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.fetchReposTreeAction = (0, toolkit_1.createAsyncThunk)('reports/fetchTree', function (payload) { return __awaiter(void 0, void 0, void 0, function () {
    var url, axiosResponse, _a;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                url = "/reports/".concat(payload.owner, "/").concat(payload.reportName, "/").concat(payload.branch, "/tree/").concat(payload.filePath);
                return [4 /*yield*/, http_client_1["default"].get(url)];
            case 1:
                axiosResponse = _c.sent();
                if ((_b = axiosResponse === null || axiosResponse === void 0 ? void 0 : axiosResponse.data) === null || _b === void 0 ? void 0 : _b.data) {
                    return [2 /*return*/, axiosResponse.data.data];
                }
                else {
                    return [2 /*return*/, null];
                }
                return [3 /*break*/, 3];
            case 2:
                _a = _c.sent();
                return [2 /*return*/, null];
            case 3: return [2 /*return*/];
        }
    });
}); });
// eslint-disable-next-line @typescript-eslint/no-unused-vars
exports.fetchReportCommentsAction = (0, toolkit_1.createAsyncThunk)('reports/fetchReportComments', function (_, _a) {
    var getState = _a.getState;
    return __awaiter(void 0, void 0, void 0, function () {
        var reports, url, axiosResponse, _b;
        var _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 2, , 3]);
                    reports = getState().reports;
                    url = "/reports/".concat(reports.active.user_id, "/").concat(reports.active.name, "/comments");
                    return [4 /*yield*/, http_client_1["default"].get(url)];
                case 1:
                    axiosResponse = _d.sent();
                    if ((_c = axiosResponse === null || axiosResponse === void 0 ? void 0 : axiosResponse.data) === null || _c === void 0 ? void 0 : _c.data) {
                        return [2 /*return*/, axiosResponse.data.data];
                    }
                    else {
                        return [2 /*return*/, null];
                    }
                    return [3 /*break*/, 3];
                case 2:
                    _b = _d.sent();
                    return [2 /*return*/, null];
                case 3: return [2 /*return*/];
            }
        });
    });
});
exports.deleteReportAction = (0, toolkit_1.createAsyncThunk)('reports/deleteReport', function (payload) { return __awaiter(void 0, void 0, void 0, function () {
    var url, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                url = "/reports/".concat(payload.owner, "/").concat(payload.reportName);
                return [4 /*yield*/, http_client_1["default"]["delete"](url)];
            case 1:
                _b.sent();
                return [2 /*return*/, null];
            case 2:
                _a = _b.sent();
                return [2 /*return*/, null];
            case 3: return [2 /*return*/];
        }
    });
}); });
// eslint-disable-next-line @typescript-eslint/no-unused-vars
exports.fetchReportsAction = (0, toolkit_1.createAsyncThunk)('reports/fetchReports', function (_, _a) {
    var getState = _a.getState;
    return __awaiter(void 0, void 0, void 0, function () {
        var _b, team, reports, user, url, axiosResponse, _c;
        var _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _e.trys.push([0, 2, , 3]);
                    _b = getState(), team = _b.team, reports = _b.reports, user = _b.user;
                    url = "/reports?team=".concat((team === null || team === void 0 ? void 0 : team.team) ? team.team.name : user.user.nickname, "&page=").concat(reports.page, "&per_page=").concat(reports.limit, "&sort=desc");
                    return [4 /*yield*/, http_client_1["default"].get(url)];
                case 1:
                    axiosResponse = _e.sent();
                    if ((_d = axiosResponse === null || axiosResponse === void 0 ? void 0 : axiosResponse.data) === null || _d === void 0 ? void 0 : _d.data) {
                        return [2 /*return*/, axiosResponse.data.data];
                    }
                    else {
                        return [2 /*return*/, null];
                    }
                    return [3 /*break*/, 3];
                case 2:
                    _c = _e.sent();
                    return [2 /*return*/, null];
                case 3: return [2 /*return*/];
            }
        });
    });
});
exports.fetchPinnedReportAction = (0, toolkit_1.createAsyncThunk)('reports/fetchPinnedReport', function () { return __awaiter(void 0, void 0, void 0, function () {
    var url, axiosResponse, _a;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                url = "/get-pinned-post";
                return [4 /*yield*/, http_client_1["default"].get(url)];
            case 1:
                axiosResponse = _c.sent();
                if ((_b = axiosResponse === null || axiosResponse === void 0 ? void 0 : axiosResponse.data) === null || _b === void 0 ? void 0 : _b.data) {
                    return [2 /*return*/, axiosResponse.data.data];
                }
                else {
                    return [2 /*return*/, null];
                }
                return [3 /*break*/, 3];
            case 2:
                _a = _c.sent();
                return [2 /*return*/, null];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.fetchFileContentsAction = (0, toolkit_1.createAsyncThunk)('reports/fetchFileContents', function (payload, _a) {
    var getState = _a.getState;
    return __awaiter(void 0, void 0, void 0, function () {
        var reports, hash, url, axiosResponse, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    reports = getState().reports;
                    hash = payload.hash;
                    if (reports.tree) {
                        hash = reports.tree[0].hash;
                    }
                    url = "/reports/".concat(payload.owner, "/").concat(payload.reportName, "/file/").concat(hash);
                    return [4 /*yield*/, http_client_1["default"].get(url)];
                case 1:
                    axiosResponse = _c.sent();
                    if (axiosResponse === null || axiosResponse === void 0 ? void 0 : axiosResponse.data) {
                        return [2 /*return*/, axiosResponse.data];
                    }
                    else {
                        return [2 /*return*/, null];
                    }
                    return [3 /*break*/, 3];
                case 2:
                    _b = _c.sent();
                    return [2 /*return*/, null];
                case 3: return [2 /*return*/];
            }
        });
    });
});
