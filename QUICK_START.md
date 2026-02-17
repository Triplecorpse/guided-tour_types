# Quick Start Guide - guided-tour_types Integration

## 📦 What You Have

✅ **guided-tour_types** package is now ready with 14 migrated DTOs

All DTOs are compiled and available in:
- `dist/` - Compiled JavaScript and TypeScript declarations

## 🚀 Immediate Next Steps

### 1. Test the Package Locally

**For Backend (NestJS):**
```bash
cd guided-tour
npm install file:../guided-tour_types
npm run build
```

**For Frontend (Angular):**
```bash
cd guided-tour_frontend
npm install file:../guided-tour_types
npm run build
```

### 2. Update Imports in Backend

Find all DTO imports in `src/` and replace:

```bash
# Example replacements needed in:
src/profile/profile.service.ts
src/location/location.service.ts
src/poi/poi.service.ts
src/collection/collection.service.ts
# ... and other service files
```

**Old format:**
```typescript
import { UserDto } from './profile/dto/user.dto';
```

**New format:**
```typescript
import { UserDto } from 'guided-tour_types';
```

### 3. Remove Duplicate DTO Files from Backend

Once all imports are updated, you can optionally remove:
- `src/profile/dto/`
- `src/location/dto/`
- `src/poi/dto/`
- `src/collection/dto/`
- `src/resource/dto/`
- `src/translation/dto/`
- etc.

### 4. Update Frontend Angular App

Same process - update all imports from relative paths to:
```typescript
import { UserDto, LocationDto, PoiDto } from 'guided-tour_types';
```

## 📋 Files to Update

### Backend (NestJS)

Search for and update these files:

```bash
# Controllers
src/profile/profile.controller.ts
src/location/location.controller.ts
src/poi/poi.controller.ts
src/collection/collection.controller.ts
src/checkout/checkout.controller.ts

# Services
src/profile/profile.service.ts
src/location/location.service.ts
src/poi/poi.service.ts
src/collection/collection.service.ts
src/checkout/checkout.service.ts
src/app-settings/app-settings.service.ts
```

### Frontend (Angular)

Search for and update services in:

```bash
src/app/core/services/user.service.ts
src/app/core/services/location.service.ts
src/app/core/services/poi.service.ts
src/app/core/services/collection.service.ts
src/app/core/services/auth.service.ts
# ... and any other repository/service files using DTOs
```

## 🔍 Verification Commands

After updating imports, verify everything compiles:

```bash
# Backend
cd guided-tour
npm run build

# Frontend
cd guided-tour_frontend
ng build
```

## ✨ Benefits You'll See

- ✅ IDE autocomplete works across both projects
- ✅ Compile-time type checking
- ✅ Single source of truth for DTOs
- ✅ Easier to maintain data contracts
- ✅ Reduced code duplication

## 📚 Documentation

Full documentation available in:
- `README.md` - Package overview and usage
- `MIGRATION_SUMMARY.md` - Detailed migration info

## ⚠️ Common Issues & Fixes

**Issue: "Cannot find module 'guided-tour_types'"**
```bash
# Solution: Rebuild the types package
cd guided-tour_types
npm run build

# Then reinstall in your projects
cd ../guided-tour
npm install
```

**Issue: Types not updating after changes**
```bash
# Solution: Rebuild types and clear node_modules cache
cd guided-tour_types
npm run build

cd ../guided-tour
rm -rf node_modules/.cache
npm run build
```

## 🎯 Success Criteria

Your migration is complete when:

✅ All imports use `guided-tour_types`
✅ Both backend and frontend compile without errors
✅ Unit tests pass
✅ Application runs without runtime errors
✅ IDE provides correct autocomplete/type hints

## 📞 Need Help?

Check MIGRATION_SUMMARY.md for:
- Detailed step-by-step instructions
- Git workflow
- Troubleshooting guide
- Version management strategy

---

**Ready to start?** Run `npm install file:../guided-tour_types` in your projects!

