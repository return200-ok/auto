# UI Specification - Xe Tao

## Design System

### Color Palette
- **Primary**: Xanh đen (#1a1f2e) hoặc Xám bạc (#4a5568)
- **Secondary**: Xanh dương (#3b82f6)
- **Accent**: Cam (#f97316)
- **Background**: Trắng (#ffffff) / Xám nhạt (#f7fafc)
- **Text**: Đen (#1a202c) / Xám đậm (#2d3748)
- **Success**: Xanh lá (#10b981)
- **Warning**: Vàng (#f59e0b)
- **Error**: Đỏ (#ef4444)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Headings**: SemiBold (600) / Bold (700)
- **Body**: Regular (400) / Medium (500)

### Spacing
- Base unit: 4px
- Common: 8, 12, 16, 24, 32, 48

## Screen Specifications

### 1. Home Screen (Trang chủ)

**Layout**:
- AppBar với tên app "Xe Tao"
- Vehicle Card (thông tin xe hiện tại)
- Quick Actions (4 buttons: Bảo dưỡng, Chi phí, Lịch hẹn, Nhắc nhở)
- Upcoming Reminders (danh sách nhắc nhở sắp tới)
- Maintenance Status (trạng thái bảo dưỡng)

**Components**:
- `VehicleInfoCard`: Hiển thị tên xe, hãng, km hiện tại
- `QuickActionButton`: Icon + label
- `ReminderListItem`: Nhắc nhở với icon và ngày
- `MaintenanceStatusWidget`: Progress bar hoặc badge

### 2. Maintenance Screen (Bảo dưỡng)

**Layout**:
- Tab bar: "Sắp tới" / "Lịch sử"
- Maintenance reminder card (nếu có)
- List of maintenance records

**Components**:
- `MaintenanceReminderCard`: Cảnh báo sắp tới hạn
- `MaintenanceHistoryItem`: Item trong lịch sử
- `AddMaintenanceButton`: Floating action button

**Forms**:
- `MaintenanceForm`: Nhập thông tin bảo dưỡng
  - Type (small/large)
  - Date picker
  - Mileage input
  - Cost (optional)
  - Notes (optional)

### 3. Expense Screen (Chi phí)

**Layout**:
- Summary cards (Tổng tháng này, Tổng năm)
- Category filter chips
- Expense list
- Chart view toggle

**Components**:
- `ExpenseSummaryCard`: Tổng chi phí
- `ExpenseCategoryChip`: Filter theo category
- `ExpenseListItem`: Item chi phí
- `ExpenseChart`: Biểu đồ (line/bar)

**Forms**:
- `ExpenseForm`: Nhập chi phí
  - Category picker
  - Amount input
  - Date picker
  - Description (optional)

### 4. Statistics Screen (Thống kê)

**Layout**:
- Period selector (Tháng / Năm)
- Total expense card
- Category breakdown (pie chart)
- Monthly trend (line chart)
- Export button

**Components**:
- `PeriodSelector`: Dropdown chọn kỳ
- `TotalExpenseCard`: Tổng chi phí
- `CategoryPieChart`: Biểu đồ tròn
- `MonthlyTrendChart`: Biểu đồ đường

### 5. Appointment Screen (Đặt lịch)

**Layout**:
- Upcoming appointments list
- Past appointments (collapsed)
- Garage list (nếu chọn gara)

**Components**:
- `AppointmentCard`: Card lịch hẹn
- `GarageSelector`: Chọn gara
- `AppointmentForm`: Form đặt lịch
  - Garage picker
  - Date picker
  - Time picker
  - Type selector
  - Notes (optional)

### 6. Reminder Screen (Nhắc nhở)

**Layout**:
- Reminder type tabs (Đăng kiểm / Bảo hiểm / Phí đường bộ)
- Reminder list
- Add reminder button

**Components**:
- `ReminderTypeTab`: Tab chọn loại
- `ReminderCard`: Card nhắc nhở
- `ReminderForm`: Form tạo nhắc nhở
  - Type selector
  - Expiry date picker
  - Reminder days input

### 7. Settings Screen (Cài đặt)

**Layout**:
- Vehicle info section
- Maintenance settings
- Notification settings
- About section

**Components**:
- `VehicleInfoSection`: Thông tin xe (editable)
- `MaintenanceSettings`: Cấu hình mốc bảo dưỡng
- `NotificationSettings`: Bật/tắt thông báo
- `AboutSection`: Thông tin app

## Navigation

### Bottom Navigation (Main)
- Home
- Bảo dưỡng
- Chi phí
- Lịch hẹn
- Cài đặt

### Routes
- `/`: Home
- `/maintenance`: Maintenance list
- `/maintenance/add`: Add maintenance
- `/expense`: Expense list
- `/expense/add`: Add expense
- `/statistics`: Statistics
- `/appointment`: Appointment list
- `/appointment/add`: Add appointment
- `/reminder`: Reminder list
- `/reminder/add`: Add reminder
- `/settings`: Settings

## Interactions

### Animations
- Page transitions: Slide
- List items: Fade in
- Buttons: Scale on press
- Charts: Animate on load

### Feedback
- Success: Green snackbar
- Error: Red snackbar
- Loading: Circular progress indicator
- Empty state: Illustration + message

## Responsive Design

### Breakpoints
- Small: < 360px (compact)
- Medium: 360-600px (standard)
- Large: > 600px (expanded)

### Adaptations
- Grid columns: 1 (small), 2 (medium), 3 (large)
- Font sizes: Scale with screen size
- Padding: Adjust based on screen width

## Accessibility

- Semantic labels for screen readers
- Minimum touch target: 44x44px
- Color contrast: WCAG AA compliant
- Font scaling support

