# Active Context - Xe Tao

## Current Status

**Phase**: Project Initialization
**Date**: 2024

## Recent Changes

- ✅ Created project structure
- ✅ Set up pubspec.yaml with dependencies
- ✅ Created Memory Bank documentation
- ✅ Defined project structure and architecture

## Current Focus

1. **Project Setup**
   - Initialize Flutter project structure
   - Set up database schema with Drift
   - Create core models and entities

2. **Next Steps**
   - Create database schema
   - Implement domain entities
   - Set up Riverpod providers
   - Create basic UI screens
   - Implement notification system

## Active Decisions

### Architecture
- **Clean Architecture** with 3 layers (Presentation, Domain, Data)
- **Riverpod** for state management
- **Drift** for local database (SQLite)

### Database
- Using Drift for type-safe database access
- All data stored locally (no cloud sync in MVP)

### State Management
- Riverpod providers for each feature
- Separate providers for UI state and business logic

## Important Patterns

### Code Organization
- Feature-based folder structure
- Separation of concerns (UI, Business Logic, Data)
- Repository pattern for data access

### Naming Conventions
- Files: snake_case (e.g., `maintenance_screen.dart`)
- Classes: PascalCase (e.g., `MaintenanceScreen`)
- Variables: camelCase (e.g., `currentMileage`)
- Constants: lowerCamelCase with `k` prefix (e.g., `kDefaultMaintenanceInterval`)

### Error Handling
- Use Result pattern for use cases
- Show user-friendly error messages
- Log errors for debugging

## Learnings & Insights

- Vietnamese users prefer simple, straightforward UI
- Offline-first approach is crucial (no internet dependency)
- Local notifications are essential for reminders
- Performance is key (response time < 100ms)

## Next Actions

1. Create database schema with Drift
2. Implement domain entities
3. Create repository interfaces and implementations
4. Set up Riverpod providers
5. Build initial UI screens
6. Implement notification system

## Questions & Considerations

- Should we support multiple vehicles? (Future consideration)
- How to handle data backup/restore? (v2 feature)
- API for fuel prices - which service to use? (v2 feature)

