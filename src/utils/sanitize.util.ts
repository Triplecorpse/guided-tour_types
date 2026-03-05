/**
 * Sanitizes a string by removing potentially harmful content
 * - Removes HTML/XML tags
 * - Removes script tags and their content
 * - Removes event handlers (onclick, onerror, etc.)
 * - Removes javascript: protocol
 * - Removes data: protocol (can be used for XSS)
 * - Trims whitespace
 */
export function sanitizeString(input: string): string {
    if (!input || typeof input !== 'string') {
        return input;
    }

    let sanitized = input;

    // Remove script tags and their content (case insensitive)
    sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

    // Remove event handlers (onclick, onerror, onload, etc.)
    sanitized = sanitized.replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, '');
    sanitized = sanitized.replace(/\s*on\w+\s*=\s*[^\s>]*/gi, '');

    // Remove javascript: protocol
    sanitized = sanitized.replace(/javascript:/gi, '');

    // Remove data: protocol (can be used for XSS)
    sanitized = sanitized.replace(/data:text\/html/gi, '');

    // Remove HTML/XML tags
    sanitized = sanitized.replace(/<[^>]*>/g, '');

    // Decode HTML entities to prevent double-encoding attacks
    sanitized = decodeHTMLEntities(sanitized);

    // Remove any remaining dangerous characters/patterns
    sanitized = sanitized.replace(/[<>]/g, '');

    // Trim whitespace
    sanitized = sanitized.trim();

    return sanitized;
}

/**
 * Decodes common HTML entities to prevent double-encoding attacks
 */
function decodeHTMLEntities(text: string): string {
    const entities: Record<string, string> = {
        '&lt;': '<',
        '&gt;': '>',
        '&amp;': '&',
        '&quot;': '"',
        '&#39;': "'",
        '&#x2F;': '/',
        '&#x60;': '`',
        '&#x3D;': '=',
    };

    return text.replace(/&[#\w]+;/g, (entity) => {
        return entities[entity] || entity;
    });
}

/**
 * Sanitizes an object by recursively sanitizing all string properties
 * Useful for sanitizing entire DTOs or nested objects
 */
export function sanitizeObject<T extends Record<string, any>>(obj: T): T {
    if (!obj || typeof obj !== 'object') {
        return obj;
    }

    const sanitized = {...obj};

    for (const key in sanitized) {
        if (sanitized.hasOwnProperty(key)) {
            const value = sanitized[key];

            if (typeof value === 'string') {
                (sanitized as any)[key] = sanitizeString(value);
            } else if (Array.isArray(value)) {
                (sanitized as any)[key] = value.map((item: any) =>
                    typeof item === 'string' ? sanitizeString(item) : sanitizeObject(item)
                );
            } else if (typeof value === 'object' && value !== null) {
                (sanitized as any)[key] = sanitizeObject(value);
            }
        }
    }

    return sanitized;
}


