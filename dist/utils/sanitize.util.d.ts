/**
 * Sanitizes a string by removing potentially harmful content
 * - Removes HTML/XML tags
 * - Removes script tags and their content
 * - Removes event handlers (onclick, onerror, etc.)
 * - Removes javascript: protocol
 * - Removes data: protocol (can be used for XSS)
 * - Trims whitespace
 */
export declare function sanitizeString(input: string): string;
/**
 * Sanitizes an object by recursively sanitizing all string properties
 * Useful for sanitizing entire DTOs or nested objects
 */
export declare function sanitizeObject<T extends Record<string, any>>(obj: T): T;
