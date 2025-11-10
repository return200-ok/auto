# Auto Parts Catalog - Mobile App

Flutter mobile application for browsing and searching auto parts by vehicle.

## Features

- **Vehicle Selection**: Choose Make → Model → Year → Trim/Engine
- **Category Browser**: Browse parts by category (Engine, Brake, Suspension, etc.)
- **Parts List**: View compatible parts for selected vehicle
- **Part Details**: View detailed information including OEM/Aftermarket numbers
- **Bookmark/Wishlist**: Save parts for later

## Tech Stack

- Flutter 3.x
- Dart 3.x
- Provider for state management
- HTTP for API calls
- SharedPreferences for local storage

## Getting Started

```bash
# Install Flutter dependencies
flutter pub get

# Run on iOS simulator
flutter run -d ios

# Run on Android emulator
flutter run -d android
```

## Project Structure

```
lib/
├── main.dart
├── models/          # Data models
├── services/        # API services
├── providers/       # State management
├── screens/         # App screens
├── widgets/         # Reusable widgets
└── utils/           # Utilities
```

## API Configuration

Update `lib/config/api_config.dart` with your backend URL:

```dart
const String API_BASE_URL = 'http://localhost:3000';
```

