/**
 * Example usage of the Sanitize decorator and utilities
 *
 * This file demonstrates how to use the sanitization features
 * to protect against XSS attacks and other security vulnerabilities.
 */
/**
 * Example 1: Using the @Sanitize() decorator with DTOs
 */
declare function exampleWithDecorator(): Promise<void>;
/**
 * Example 2: Using sanitizeString() directly
 */
declare function exampleSanitizeString(): void;
/**
 * Example 3: Using sanitizeObject() for nested objects
 */
declare function exampleSanitizeObject(): void;
/**
 * Example 4: Common attack patterns
 */
declare function exampleAttackPatterns(): void;
/**
 * Run all examples
 */
declare function runExamples(): Promise<void>;
export { exampleWithDecorator, exampleSanitizeString, exampleSanitizeObject, exampleAttackPatterns, runExamples, };
