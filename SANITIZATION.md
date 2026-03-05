# Sanitization Utilities

## Overview

This package provides a custom `@Sanitize()` decorator and utility functions to sanitize user input and prevent XSS (Cross-Site Scripting) attacks and other security vulnerabilities.

## Features

- **@Sanitize() Decorator**: Automatically sanitizes string properties in DTOs
- **sanitizeString()**: Function to sanitize individual strings
- **sanitizeObject()**: Function to recursively sanitize all string properties in an object

## Sanitization Process

The sanitization process removes the following potentially harmful content:

- HTML/XML tags (e.g., `<script>`, `<iframe>`, `<img>`)
- Script tags and their content
- Event handlers (e.g., `onclick`, `onerror`, `onload`)
- JavaScript protocol (`javascript:`)
- Data protocol that can be used for XSS (`data:text/html`)
- Dangerous characters (`<`, `>`)
- Decodes HTML entities to prevent double-encoding attacks

## Usage

### Using the @Sanitize() Decorator

The `@Sanitize()` decorator works with `class-transformer` to automatically sanitize string properties when transforming plain objects to class instances.

```typescript
import { IsString } from 'class-validator';
import { Sanitize } from 'guided-tour_types';

export class ContactDto {
  @IsString()
  @Sanitize()
  topic: string;

  @IsString()
  @Sanitize()
  body: string;
}
```

**Example:**

```typescript
import { plainToClass } from 'class-transformer';
import { ContactDto } from './dto/auxiliary/contact.dto';

const unsafeInput = {
  topic: 'Hello <script>alert("XSS")</script>',
  body: 'Check this <img src=x onerror="alert(1)"> out!'
};

const sanitized = plainToClass(ContactDto, unsafeInput);

console.log(sanitized.topic); // Output: "Hello"
console.log(sanitized.body);  // Output: "Check this  out!"
```

### Using sanitizeString()

Sanitize individual strings directly:

```typescript
import { sanitizeString } from 'guided-tour_types';

const userInput = '<script>alert("XSS")</script>Hello World';
const clean = sanitizeString(userInput);

console.log(clean); // Output: "Hello World"
```

### Using sanitizeObject()

Recursively sanitize all string properties in an object:

```typescript
import { sanitizeObject } from 'guided-tour_types';

const unsafeObject = {
  name: 'John<script>alert(1)</script>',
  email: 'john@example.com',
  comments: [
    'First comment <img src=x onerror="alert(1)">',
    'Second comment'
  ],
  profile: {
    bio: 'My bio <a href="javascript:alert(1)">click</a>'
  }
};

const clean = sanitizeObject(unsafeObject);

console.log(clean);
// Output:
// {
//   name: 'John',
//   email: 'john@example.com',
//   comments: ['First comment ', 'Second comment'],
//   profile: { bio: 'My bio click' }
// }
```

## Integration with NestJS

When using with NestJS, the sanitization happens automatically during the validation pipeline:

```typescript
import { Body, Controller, Post } from '@nestjs/common';
import { ContactDto } from 'guided-tour_types';

@Controller('contact')
export class ContactController {
  @Post()
  async create(@Body() contactDto: ContactDto) {
    // contactDto.topic and contactDto.body are already sanitized
    return this.contactService.create(contactDto);
  }
}
```

## Integration with Angular

When using with Angular, you need to use `class-transformer` to transform your data:

```typescript
import { plainToClass } from 'class-transformer';
import { ContactDto } from 'guided-tour_types';

export class ContactFormComponent {
  onSubmit(formData: any) {
    // Transform and sanitize the form data
    const sanitizedData = plainToClass(ContactDto, formData);
    
    // Send sanitized data to the server
    this.http.post('/api/contact', sanitizedData).subscribe();
  }
}
```

## Security Notes

1. **Defense in Depth**: Sanitization is just one layer of security. Always validate and sanitize on both client and server sides.

2. **Output Encoding**: When displaying user-generated content in HTML, use proper output encoding (e.g., Angular's built-in sanitization, DOMPurify).

3. **Context-Aware**: This sanitization is designed for general text input. For rich text editors, consider using specialized libraries like DOMPurify.

4. **Database Security**: Use parameterized queries to prevent SQL injection attacks.

## API Reference

### @Sanitize()

Property decorator that sanitizes string values during transformation.

**Usage:** Apply to string properties in DTOs.

### sanitizeString(input: string): string

Sanitizes a single string value.

**Parameters:**
- `input`: The string to sanitize

**Returns:** Sanitized string

### sanitizeObject<T>(obj: T): T

Recursively sanitizes all string properties in an object.

**Parameters:**
- `obj`: The object to sanitize

**Returns:** New object with sanitized string values

## Examples of Prevented Attacks

```typescript
// XSS via script tag
sanitizeString('<script>alert("XSS")</script>'); 
// Returns: ""

// XSS via event handler
sanitizeString('<img src=x onerror="alert(1)">');
// Returns: ""

// XSS via javascript protocol
sanitizeString('<a href="javascript:alert(1)">Click</a>');
// Returns: "Click"

// HTML injection
sanitizeString('Hello <b>bold</b> world');
// Returns: "Hello bold world"

// Mixed content
sanitizeString('Normal text <script>bad()</script> more text');
// Returns: "Normal text  more text"
```

