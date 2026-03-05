# Sanitize Decorator - Quick Reference

## Installation

This package is already included in `guided-tour_types`. Just import and use:

```typescript
import { Sanitize, sanitizeString, sanitizeObject } from 'guided-tour_types';
```

## Quick Usage

### In DTOs (Recommended)

```typescript
import { IsString } from 'class-validator';
import { Sanitize } from 'guided-tour_types';

export class MyDto {
  @IsString()
  @Sanitize()  // ← Add this decorator
  userInput: string;
}
```

### Direct Function Call

```typescript
import { sanitizeString } from 'guided-tour_types';

const clean = sanitizeString(untrustedInput);
```

## What Gets Removed

- ✅ `<script>` tags
- ✅ Event handlers (`onclick`, `onerror`, etc.)
- ✅ `javascript:` protocol
- ✅ All HTML tags
- ✅ HTML entities (to prevent double-encoding)
- ✅ XSS attempts

## Examples

| Input | Output |
|-------|--------|
| `<script>alert(1)</script>Hello` | `Hello` |
| `<img src=x onerror="alert(1)">` | `` (empty) |
| `Click <a href="javascript:alert(1)">here</a>` | `Click here` |
| `Hello <b>world</b>` | `Hello world` |
| `&lt;script&gt;alert(1)&lt;/script&gt;` | `` (empty) |

## Best Practices

1. **Use with class-validator**: Combine `@Sanitize()` with `@IsString()`, `@IsNotEmpty()`, etc.
2. **Server-side validation**: Always validate on the server, not just the client
3. **Defense in depth**: Use multiple security layers (sanitization + CSP + output encoding)
4. **Rich text**: For HTML editors, use specialized libraries like DOMPurify

## Integration

### NestJS
```typescript
@Post()
async create(@Body() dto: ContactDto) {
  // dto is automatically sanitized
}
```

### Angular
```typescript
import { plainToClass } from 'class-transformer';

const sanitized = plainToClass(ContactDto, formData);
```

## API

- `@Sanitize()` - Property decorator for DTOs
- `sanitizeString(input: string): string` - Sanitize a single string
- `sanitizeObject<T>(obj: T): T` - Recursively sanitize an object

## See Also

- Full documentation: [SANITIZATION.md](./SANITIZATION.md)
- Examples: [src/sanitization.examples.ts](./src/sanitization.examples.ts)

