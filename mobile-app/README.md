# Auto Parts Mobile App

Beautiful and modern Flutter mobile application for the Auto Parts Catalog project.

## 🎨 Features

- **Modern UI/UX**: Material Design 3 with beautiful animations
- **Smart Vehicle Selection**: Step-by-step selection (Make → Model → Year)
- **Parts Catalog**: Browse compatible parts for your vehicle
- **Detailed Part Info**: Complete specifications, OEM numbers, and descriptions
- **Smooth Animations**: Staggered animations for better user experience
- **Image Caching**: Optimized image loading with cached network images

## 🚀 Getting Started

### Prerequisites

- Flutter 3.0+
- iOS Simulator or Android Emulator
- Backend API running on `http://localhost:3000`

### Installation

1. Install dependencies:
```bash
flutter pub get
```

2. Run the app:
```bash
flutter run
```

### Configuration

For different environments, update `lib/config/api_config.dart`:

- **iOS Simulator**: `http://localhost:3000`
- **Android Emulator**: `http://10.0.2.2:3000`
- **Physical Device**: `http://<your-computer-ip>:3000`

## 📱 Screens

### Home Screen
- Welcome screen with gradient background
- Feature highlights
- Quick access to vehicle selection

### Vehicle Selection
- Make selection
- Model selection (based on make)
- Year selection (based on make & model)
- Smooth step-by-step flow

### Parts List
- List of compatible parts for selected vehicle
- Part images with fallback
- Brand and part number display
- Empty state handling

### Part Details
- Hero image section
- Complete part information
- OEM and Aftermarket numbers
- Detailed specifications
- Description

## 🛠️ Tech Stack

- **Flutter**: Cross-platform mobile framework
- **Provider**: State management
- **Google Fonts**: Beautiful typography
- **Cached Network Image**: Optimized image loading
- **Staggered Animations**: Smooth list animations

## 📦 Dependencies

- `provider` - State management
- `http` - API calls
- `cached_network_image` - Image caching
- `google_fonts` - Typography
- `flutter_staggered_animations` - Animations
- `shimmer` - Loading placeholders

## 🎯 Project Structure

```
lib/
├── config/
│   └── api_config.dart      # API configuration
├── models/
│   ├── vehicle.dart          # Vehicle model
│   ├── part.dart             # Part model
│   └── part_category.dart    # Category model
├── providers/
│   ├── vehicle_provider.dart # Vehicle state
│   └── part_provider.dart    # Part state
├── screens/
│   ├── home_screen.dart       # Home screen
│   ├── vehicle_selection_screen.dart
│   ├── parts_list_screen.dart
│   └── part_details_screen.dart
├── services/
│   └── api_service.dart      # API service
└── main.dart                  # App entry point
```

## 🔧 Development

### Running on iOS
```bash
flutter run -d ios
```

### Running on Android
```bash
flutter run -d android
```

### Building for Production

**iOS:**
```bash
flutter build ios
```

**Android:**
```bash
flutter build apk
```

## 📝 Notes

- The app requires the backend API to be running
- Make sure to update `api_config.dart` for your environment
- iOS requires HTTP permissions in `Info.plist` (already configured for development)

## 🐛 Troubleshooting

### API Connection Issues
- Check if backend is running on the correct port
- Verify API URL in `lib/config/api_config.dart`
- For physical devices, ensure device and computer are on same network

### Build Issues
- Run `flutter clean` and `flutter pub get`
- Check Flutter version: `flutter --version`
- Ensure all dependencies are compatible

## 📄 License

UNLICENSED - Private project
