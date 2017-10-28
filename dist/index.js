"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_client_1 = require("apollo-client");
var HTTPFetchUploadNetworkInterface = /** @class */ (function (_super) {
    __extends(HTTPFetchUploadNetworkInterface, _super);
    function HTTPFetchUploadNetworkInterface() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HTTPFetchUploadNetworkInterface.prototype.fetchFromRemoteEndpoint = function (_a) {
        var request = _a.request, options = _a.options;
        if (typeof FormData !== "undefined" && isObject(request.variables)) {
            var _b = extractFiles(request.variables), variables = _b.variables, files = _b.files;
            if (files.length > 0) {
                var formData_1 = new FormData();
                formData_1.append("query", apollo_client_1.printAST(request.query));
                formData_1.append("variables", JSON.stringify(variables));
                files.forEach(function (_a) {
                    var name = _a.name, file = _a.file;
                    return formData_1.append(name, file);
                });
                return fetch(this._uri, __assign({ body: formData_1, method: "POST" }, options));
            }
        }
        return _super.prototype.fetchFromRemoteEndpoint.call(this, { request: request, options: options });
    };
    return HTTPFetchUploadNetworkInterface;
}(apollo_client_1.HTTPFetchNetworkInterface));
exports.HTTPFetchUploadNetworkInterface = HTTPFetchUploadNetworkInterface;
function createNetworkInterface(options) {
    return new HTTPFetchUploadNetworkInterface(options.uri, options.opts);
}
exports.createNetworkInterface = createNetworkInterface;
function extractFiles(variables) {
    var files = [];
    var walkTree = function (tree, path) {
        if (path === void 0) { path = []; }
        var mapped = isArray(tree) ? tree.slice() : __assign({}, tree);
        for (var _i = 0, _a = Object.entries(mapped); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            if (isFile(value) || isFileList(value)) {
                var name_1 = path.concat([key]).join(".");
                var file = isFileList(value)
                    ? Array.from(value)
                    : value;
                files.push({ file: file, name: name_1 });
                mapped[key] = name_1;
            }
            else if (isObject(value)) {
                mapped[key] = walkTree(value, path.concat([key]));
            }
        }
        return mapped;
    };
    return {
        files: files,
        variables: walkTree(variables)
    };
}
function isArray(value) {
    return value !== null && value instanceof Array;
}
function isObject(value) {
    return value !== null && typeof value === "object";
}
function isFile(value) {
    return typeof File !== "undefined" && value instanceof File;
}
function isFileList(value) {
    return typeof FileList !== "undefined" && value instanceof FileList;
}
//# sourceMappingURL=index.js.map