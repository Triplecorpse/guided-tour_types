# guided-tour_types

Shared DTOs and types for guided-tour (NestJS + Angular)

## Overview

This package contains all shared DTOs and types used across the guided-tour backend (NestJS) and frontend (Angular) applications. It ensures type safety and consistency across both applications.

## Installation

For backend (NestJS):
```bash
npm install guided-tour_types
```

For frontend (Angular):
```bash
npm install guided-tour_types
```

### Git Dependency (Local Development)

If using local development, add to `package.json`:

```json
{
  "devDependencies": {
    "guided-tour_types": "file:../guided-tour_types"
  }
}
```

## Usage

### NestJS Backend

```typescript
import { UserDto, LocationDto, PoiDto } from 'guided-tour_types';

export class UserService {
  create(userDto: UserDto): Promise<User> {
    // Your implementation
  }
}
```

### Angular Frontend

```typescript
import { UserDto, LocationDto, PoiDto } from 'guided-tour_types';

export class UserService {
  constructor(private http: HttpClient) {}

  getUser(): Observable<UserDto> {
    return this.http.get<UserDto>('/api/users/me');
  }
}
```

## Exported DTOs

### App Settings
- `AppSettingDto` - Single setting configuration
- `AppSettingsDto` - Collection of settings

### Checkout
- `CheckoutInputDto` - Checkout session input

### Collection
- `CollectionDto` - Collection of guides/POIs

### Common
- `PaginationQueryDto` - Pagination parameters

### IAM
- `RefreshTokenDto` - Token refresh request

### Location (Guide)
- `LocationDto` - Location/Guide entity
- `PriceDto` - Price configuration
- `VerifySessionInputDto` - Session verification

### POI (Point of Interest)
- `PoiDto` - Point of Interest entity
- `GetPoisDto` - Filter for fetching POIs

### Profile
- `UserDto` - User profile
- `DeleteUserRequestDto` - User deletion request

### Resource
- `ResourceDto` - Resource (image, video, etc.)

### Translation
- `TranslationDto` - Translation for multi-language support

## Features

- ✅ **class-validator** decorators for validation
- ✅ **class-transformer** decorators for transformation
- ✅ **TypeScript** strict mode enabled
- ✅ **GeoJSON** support for geographic data
- ✅ Compiled to CommonJS (ES2020)
- ✅ Full type declarations (.d.ts)

## Development

### Build
```bash
npm run build
```

### Watch mode
```bash
npm run dev
```

## Version Updates

When updating DTOs:

1. Make changes to DTOs in `src/dto/`
2. Build the package: `npm run build`
3. Update version in `package.json`
4. Commit and tag: `git tag v0.1.1`
5. Push to GitHub

## License

MIT

