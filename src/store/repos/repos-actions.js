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
exports.fetchRepoTreeAction = exports.fetchRepoAction = exports.setSearchAndRefresh = exports.fetchReposAction = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var http_client_1 = require("../../services/http-client");
var repos_slice_1 = require("./repos-slice");
// eslint-disable-next-line @typescript-eslint/no-unused-vars
exports.fetchReposAction = (0, toolkit_1.createAsyncThunk)('repos/fetchRepos', function (_, _a) {
    var getState = _a.getState;
    return __awaiter(void 0, void 0, void 0, function () {
        var repos, url, axiosResponse, _b;
        var _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 2, , 3]);
                    repos = getState().repos;
                    url = "/repos/".concat(repos.provider, "?page=").concat(repos.page, "&per_page=").concat(repos.limit);
                    if ((repos === null || repos === void 0 ? void 0 : repos.searchQuery) && repos.searchQuery.length > 0) {
                        url += "&filter=".concat(repos.searchQuery);
                    }
                    return [4 /*yield*/, http_client_1["default"].get(url)];
                case 1:
                    axiosResponse = _d.sent();
                    if ((_c = axiosResponse === null || axiosResponse === void 0 ? void 0 : axiosResponse.data) === null || _c === void 0 ? void 0 : _c.data) {
                        return [2 /*return*/, axiosResponse.data.data];
                    }
                    else {
                        return [2 /*return*/, []];
                    }
                    return [3 /*break*/, 3];
                case 2:
                    _b = _d.sent();
                    return [2 /*return*/, []];
                case 3: return [2 /*return*/];
            }
        });
    });
});
exports.setSearchAndRefresh = (0, toolkit_1.createAsyncThunk)('repos/setSearchAndRefresh', function (query, _a) {
    var dispatch = _a.dispatch;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    dispatch((0, repos_slice_1.setSearchQuery)(query));
                    return [4 /*yield*/, dispatch((0, exports.fetchReposAction)())];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
});
exports.fetchRepoAction = (0, toolkit_1.createAsyncThunk)('repos/fetchRepo', function (payload, _a) {
    var getState = _a.getState;
    return __awaiter(void 0, void 0, void 0, function () {
        var repos, url, axiosResponse, _b;
        var _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 2, , 3]);
                    repos = getState().repos;
                    url = "/repos/".concat(repos.provider, "/").concat(payload.owner, "/").concat(payload.name);
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
exports.fetchRepoTreeAction = (0, toolkit_1.createAsyncThunk)('repos/fetchTree', function (payload, _a) {
    var getState = _a.getState;
    return __awaiter(void 0, void 0, void 0, function () {
        var repos, url, axiosResponse, _b;
        var _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 2, , 3]);
                    repos = getState().repos;
                    if (!repos.active) {
                        return [2 /*return*/];
                    }
                    url = "/repos/".concat(repos.provider, "/").concat(payload.owner, "/").concat(repos.active.name, "/").concat(payload.branch, "/tree");
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
