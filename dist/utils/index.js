"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeObject = exports.sanitizeString = exports.Sanitize = void 0;
var sanitize_decorator_1 = require("./sanitize.decorator");
Object.defineProperty(exports, "Sanitize", { enumerable: true, get: function () { return sanitize_decorator_1.Sanitize; } });
var sanitize_util_1 = require("./sanitize.util");
Object.defineProperty(exports, "sanitizeString", { enumerable: true, get: function () { return sanitize_util_1.sanitizeString; } });
Object.defineProperty(exports, "sanitizeObject", { enumerable: true, get: function () { return sanitize_util_1.sanitizeObject; } });
