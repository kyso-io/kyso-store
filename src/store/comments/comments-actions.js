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
exports.fetchReportCommentsAction = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var http_client_1 = require("../../services/http-client");
var relations_actions_1 = require("../relations/relations-actions");
// eslint-disable-next-line @typescript-eslint/no-unused-vars
exports.fetchReportCommentsAction = (0, toolkit_1.createAsyncThunk)('comments/fetchReportComments', function (payload, _a) {
    var getState = _a.getState, dispatch = _a.dispatch;
    return __awaiter(void 0, void 0, void 0, function () {
        var url, axiosResponse, _b;
        var _c, _d, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    _f.trys.push([0, 2, , 3]);
                    url = "/reports/".concat(payload.owner, "/").concat(payload.reportName, "/comments");
                    return [4 /*yield*/, http_client_1["default"].get(url)];
                case 1:
                    axiosResponse = _f.sent();
                    if ((_c = axiosResponse === null || axiosResponse === void 0 ? void 0 : axiosResponse.data) === null || _c === void 0 ? void 0 : _c.relations) {
                        dispatch((0, relations_actions_1.fetchRelationsAction)((_d = axiosResponse === null || axiosResponse === void 0 ? void 0 : axiosResponse.data) === null || _d === void 0 ? void 0 : _d.relations));
                    }
                    if ((_e = axiosResponse === null || axiosResponse === void 0 ? void 0 : axiosResponse.data) === null || _e === void 0 ? void 0 : _e.data) {
                        return [2 /*return*/, axiosResponse.data.data];
                    }
                    else {
                        return [2 /*return*/, null];
                    }
                    return [3 /*break*/, 3];
                case 2:
                    _b = _f.sent();
                    return [2 /*return*/, null];
                case 3: return [2 /*return*/];
            }
        });
    });
});
