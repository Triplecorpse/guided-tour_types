import { Transform } from 'class-transformer';
import { sanitizeString } from './sanitize.util';

/**
 * Decorator that sanitizes string input by removing potentially harmful content
 * Uses class-transformer's @Transform under the hood
 */
export function Sanitize() {
  return Transform(({ value }) => {
    if (typeof value === 'string') {
      return sanitizeString(value);
    }
    return value;
  });
}

