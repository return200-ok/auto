# Technical Specification - Xe Tao

## Kiến trúc

### Architecture Pattern
- **Clean Architecture** với 3 layers:
  - **Presentation**: UI, State Management (Riverpod)
  - **Domain**: Business logic, Entities, Use Cases
  - **Data**: Repositories, Data Sources, Database

### State Management
- **Riverpod** cho state management
- Provider pattern cho dependency injection

### Database
- **Drift** (SQLite) cho local storage
- Schema versioning support
- Migration strategy

## Cấu trúc thư mục

```
lib/
├── core/
│   ├── constants/          # App constants
│   ├── theme/              # App theme, colors
│   ├── utils/              # Utility functions
│   └── extensions/         # Dart extensions
├── data/
│   ├── database/           # Drift database
│   ├── models/             # Data models (DTOs)
│   ├── repositories/       # Repository implementations
│   └── data_sources/       # Local data sources
├── domain/
│   ├── entities/           # Domain entities
│   ├── repositories/       # Repository interfaces
│   └── use_cases/          # Business use cases
├── presentation/
│   ├── screens/            # Screen widgets
│   ├── widgets/            # Reusable widgets
│   ├── providers/          # Riverpod providers
│   └── routes/             # App routing
└── main.dart
```

## Database Schema

### Vehicle Table
```dart
- id: String (UUID)
- name: String
- brand: String
- model: String
- year: int
- currentMileage: int
- lastMaintenanceDate: DateTime?
- lastMaintenanceMileage: int?
- createdAt: DateTime
- updatedAt: DateTime
```

### Maintenance Table
```dart
- id: String (UUID)
- vehicleId: String
- type: MaintenanceType (small/large)
- date: DateTime
- mileage: int
- cost: double?
- notes: String?
- createdAt: DateTime
```

### Expense Table
```dart
- id: String (UUID)
- vehicleId: String
- category: ExpenseCategory
- amount: double
- date: DateTime
- description: String?
- createdAt: DateTime
```

### Appointment Table
```dart
- id: String (UUID)
- vehicleId: String
- garageName: String
- date: DateTime
- time: TimeOfDay
- type: AppointmentType
- notes: String?
- reminderSent: bool
- createdAt: DateTime
```

### Reminder Table
```dart
- id: String (UUID)
- vehicleId: String
- type: ReminderType (registration/insurance/roadFee)
- expiryDate: DateTime
- reminderDays: int (default: 7)
- createdAt: DateTime
```

## Models & Entities

### Domain Entities
- `Vehicle`: Thông tin xe
- `Maintenance`: Lịch sử bảo dưỡng
- `Expense`: Chi phí
- `Appointment`: Lịch hẹn
- `Reminder`: Nhắc nhở

### Enums
- `MaintenanceType`: small, large
- `ExpenseCategory`: fuel, maintenance, repair, parts, toll, insurance, registration, other
- `AppointmentType`: maintenance, repair, inspection
- `ReminderType`: registration, insurance, roadFee

## Use Cases

### Vehicle Use Cases
- `CreateVehicle`: Tạo xe mới
- `UpdateVehicle`: Cập nhật thông tin xe
- `GetVehicle`: Lấy thông tin xe
- `UpdateMileage`: Cập nhật số km

### Maintenance Use Cases
- `GetMaintenanceReminder`: Tính toán mốc bảo dưỡng tiếp theo
- `CreateMaintenance`: Ghi nhận bảo dưỡng
- `GetMaintenanceHistory`: Lấy lịch sử bảo dưỡng

### Expense Use Cases
- `CreateExpense`: Thêm chi phí
- `GetExpensesByPeriod`: Lấy chi phí theo kỳ
- `GetExpenseStatistics`: Thống kê chi phí
- `ExportExpenses`: Xuất dữ liệu

### Appointment Use Cases
- `CreateAppointment`: Đặt lịch hẹn
- `GetUpcomingAppointments`: Lấy lịch hẹn sắp tới
- `CancelAppointment`: Hủy lịch hẹn

### Reminder Use Cases
- `CreateReminder`: Tạo nhắc nhở
- `GetUpcomingReminders`: Lấy nhắc nhở sắp tới
- `CheckReminders`: Kiểm tra và gửi thông báo

## Notification System

### Local Notifications
- Sử dụng `flutter_local_notifications`
- Nhắc bảo dưỡng: khi còn 300 km hoặc 7 ngày
- Nhắc lịch hẹn: 1 ngày trước
- Nhắc hạn định kỳ: theo số ngày cấu hình

### Notification Types
- Maintenance reminder
- Appointment reminder
- Expiry reminder (đăng kiểm, bảo hiểm, phí đường bộ)

## UI Components

### Screens
- `HomeScreen`: Trang chủ với tổng quan
- `MaintenanceScreen`: Quản lý bảo dưỡng
- `ExpenseScreen`: Ghi chép chi phí
- `StatisticsScreen`: Thống kê và biểu đồ
- `AppointmentScreen`: Đặt lịch hẹn
- `ReminderScreen`: Quản lý nhắc nhở
- `SettingsScreen`: Cài đặt

### Widgets
- `VehicleCard`: Card hiển thị thông tin xe
- `MaintenanceCard`: Card bảo dưỡng
- `ExpenseForm`: Form nhập chi phí
- `ExpenseChart`: Biểu đồ chi phí
- `AppointmentForm`: Form đặt lịch
- `ReminderCard`: Card nhắc nhở

## Dependencies

### Core
- `flutter_riverpod`: State management
- `drift`: Database
- `path_provider`: File paths

### UI
- `google_fonts`: Typography
- `fl_chart`: Charts

### Notifications
- `flutter_local_notifications`: Local notifications
- `timezone`: Timezone handling

### Utilities
- `intl`: Internationalization
- `uuid`: UUID generation
- `shared_preferences`: Simple preferences

### Future
- `http` / `dio`: API calls (for fuel prices)
- `pdf` / `printing`: PDF export

## Performance Requirements

- App size < 50MB
- Response time < 100ms
- Smooth 60fps animations
- Efficient database queries
- Lazy loading for lists

## Security & Privacy

- All data stored locally
- No cloud sync (MVP)
- No user authentication
- No personal data collection

