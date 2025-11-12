# Technical Overview - Xe Tao

## Technology Stack

### Framework
- **Flutter**: 3.9.2+
- **Dart**: 3.9.2+

### State Management
- **Riverpod**: 2.6.1+ - Modern state management solution

### Database
- **Drift**: 2.18.0+ - Type-safe SQLite wrapper
- **SQLite**: Local database for offline storage

### UI Libraries
- **Google Fonts**: Typography
- **FL Chart**: Data visualization

### Notifications
- **flutter_local_notifications**: Local push notifications
- **timezone**: Timezone handling

### Utilities
- **intl**: Internationalization and formatting
- **uuid**: UUID generation
- **shared_preferences**: Simple key-value storage
- **path_provider**: File system paths

## Architecture

### Clean Architecture Layers

```
┌─────────────────────────────────────┐
│      Presentation Layer             │
│  (Screens, Widgets, Providers)      │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│        Domain Layer                  │
│  (Entities, Use Cases, Interfaces)   │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│         Data Layer                    │
│  (Repositories, Data Sources, DB)    │
└──────────────────────────────────────┘
```

### Dependency Flow
- Presentation → Domain ← Data
- Domain has no dependencies on other layers
- Data implements Domain interfaces

## Project Structure

```
lib/
├── core/
│   ├── constants/
│   │   ├── app_constants.dart
│   │   └── maintenance_constants.dart
│   ├── theme/
│   │   ├── app_theme.dart
│   │   └── app_colors.dart
│   ├── utils/
│   │   ├── date_utils.dart
│   │   └── format_utils.dart
│   └── extensions/
│       └── datetime_extensions.dart
├── data/
│   ├── database/
│   │   ├── app_database.dart
│   │   └── migrations/
│   ├── models/
│   │   ├── vehicle_model.dart
│   │   ├── maintenance_model.dart
│   │   └── expense_model.dart
│   ├── repositories/
│   │   ├── vehicle_repository_impl.dart
│   │   └── maintenance_repository_impl.dart
│   └── data_sources/
│       └── local_data_source.dart
├── domain/
│   ├── entities/
│   │   ├── vehicle.dart
│   │   ├── maintenance.dart
│   │   └── expense.dart
│   ├── repositories/
│   │   ├── vehicle_repository.dart
│   │   └── maintenance_repository.dart
│   └── use_cases/
│       ├── vehicle/
│       └── maintenance/
├── presentation/
│   ├── screens/
│   │   ├── home/
│   │   ├── maintenance/
│   │   └── expense/
│   ├── widgets/
│   │   ├── common/
│   │   └── charts/
│   ├── providers/
│   │   ├── vehicle_provider.dart
│   │   └── maintenance_provider.dart
│   └── routes/
│       └── app_router.dart
└── main.dart
```

## Key Design Patterns

### Repository Pattern
- Abstracts data sources
- Single source of truth for data
- Easy to swap implementations

### Provider Pattern (Riverpod)
- Dependency injection
- State management
- Reactive updates

### Use Case Pattern
- Encapsulates business logic
- Single responsibility
- Testable

## Database Design

### Tables
1. **vehicles**: Vehicle information
2. **maintenances**: Maintenance history
3. **expenses**: Expense records
4. **appointments**: Scheduled appointments
5. **reminders**: Reminder configurations

### Relationships
- One-to-many: Vehicle → Maintenances
- One-to-many: Vehicle → Expenses
- One-to-many: Vehicle → Appointments
- One-to-many: Vehicle → Reminders

## State Management Strategy

### Riverpod Providers
- **StateProvider**: Simple state
- **StateNotifierProvider**: Complex state with logic
- **FutureProvider**: Async data loading
- **StreamProvider**: Real-time updates

### Provider Organization
- One provider per feature
- Separate providers for UI state and business logic
- Use providers for dependency injection

## Notification System

### Architecture
- Local notifications only (no push)
- Scheduled notifications
- Notification channels (maintenance, appointment, reminder)

### Implementation
- Use `flutter_local_notifications`
- Schedule notifications based on reminders
- Cancel notifications when reminders are completed

## Performance Considerations

### Database
- Index frequently queried columns
- Use pagination for large lists
- Batch operations when possible

### UI
- Lazy loading for lists
- Image caching
- Debounce user inputs
- Optimize rebuilds with const widgets

### Memory
- Dispose controllers properly
- Clear caches when not needed
- Limit data loaded at once

## Testing Strategy

### Unit Tests
- Use cases
- Repository implementations
- Utility functions

### Widget Tests
- Individual widgets
- Screen components
- User interactions

### Integration Tests
- Complete user flows
- Database operations
- Navigation

## Build & Deployment

### Android
- Build APK: `flutter build apk`
- Build App Bundle: `flutter build appbundle`

### iOS (Future)
- Build IPA: `flutter build ios`

### Code Generation
- Run: `flutter pub run build_runner build`
- Watch: `flutter pub run build_runner watch`

## Development Workflow

1. Create feature branch
2. Implement feature following architecture
3. Write tests
4. Code review
5. Merge to main

## Code Quality

### Linting
- Use `flutter_lints` package
- Follow Dart style guide
- Custom rules in `analysis_options.yaml`

### Formatting
- Use `dart format`
- Consistent code style
- Meaningful variable names

