"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sanitize = Sanitize;
const class_transformer_1 = require("class-transformer");
const sanitize_util_1 = require("./sanitize.util");
/**
 * Decorator that sanitizes string input by removing potentially harmful content
 * Uses class-transformer's @Transform under the hood
 */
function Sanitize() {
    return (0, class_transformer_1.Transform)(({ value }) => {
        if (typeof value === 'string') {
            return (0, sanitize_util_1.sanitizeString)(value);
        }
        return value;
    });
}
