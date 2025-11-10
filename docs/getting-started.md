# Getting Started - Auto Parts Catalog

Hướng dẫn bắt đầu với dự án Auto Parts Catalog.

## Yêu Cầu Hệ Thống

- Node.js 18+ (cho Backend và Admin CMS)
- PostgreSQL 15+ (hoặc sử dụng Docker)
- Flutter 3.x (cho Mobile App)
- Docker & Docker Compose (tùy chọn, để chạy PostgreSQL)

## Cài Đặt Nhanh với Docker

### 1. Khởi động Database và Backend

```bash
cd "local/pro auto"
docker-compose up -d
```

### 2. Chạy Database Migrations và Seed Data

```bash
cd backend
npm install
npm run seed
```

### 3. Khởi động Backend (nếu chưa chạy trong Docker)

```bash
cd backend
npm install
npm run start:dev
```

Backend sẽ chạy tại: http://localhost:3000

## Cài Đặt Thủ Công

### 1. Database Setup

```bash
# Tạo database
createdb auto_parts

# Hoặc sử dụng psql
psql -U postgres
CREATE DATABASE auto_parts;
```

### 2. Backend Setup

```bash
cd backend
npm install

# Tạo file .env từ .env.example
cp .env.example .env

# Chỉnh sửa .env với thông tin database của bạn
# DB_HOST=localhost
# DB_PORT=5432
# DB_USERNAME=postgres
# DB_PASSWORD=your_password
# DB_DATABASE=auto_parts

# Chạy seed data
npm run seed

# Khởi động server
npm run start:dev
```

### 3. Admin CMS Setup

```bash
cd admin-cms
npm install

# Tạo file .env.local
echo "NEXT_PUBLIC_API_URL=http://localhost:3000" > .env.local

# Khởi động dev server
npm run dev
```

Admin CMS sẽ chạy tại: http://localhost:3001

### 4. Mobile App Setup

```bash
cd mobile-app
flutter pub get

# Chạy trên iOS
flutter run -d ios

# Hoặc chạy trên Android
flutter run -d android
```

## Kiểm Tra API

Sau khi backend đã chạy, bạn có thể test API:

```bash
# Health check
curl http://localhost:3000/health

# Lấy danh sách makes
curl http://localhost:3000/vehicles/makes

# Lấy danh sách vehicles
curl http://localhost:3000/vehicles
```

## Cấu Trúc Dự Án

```
pro auto/
├── backend/          # NestJS API Server
│   ├── src/
│   │   ├── entities/     # Database entities
│   │   ├── modules/      # Feature modules
│   │   ├── config/       # Configuration
│   │   └── seed/         # Seed data
│   └── package.json
├── admin-cms/        # Next.js Admin Interface
│   ├── src/
│   │   ├── app/          # Next.js pages
│   │   └── lib/          # API client
│   └── package.json
├── mobile-app/       # Flutter Mobile App
│   ├── lib/
│   │   ├── models/       # Data models
│   │   ├── services/     # API services
│   │   ├── providers/    # State management
│   │   └── screens/      # App screens
│   └── pubspec.yaml
└── docs/            # Documentation
```

## API Endpoints Chính

### Vehicles
- `GET /vehicles` - Lấy danh sách vehicles
- `GET /vehicles/makes` - Lấy danh sách makes
- `GET /vehicles/models?make=...` - Lấy danh sách models
- `GET /vehicles/years?make=...&model=...` - Lấy danh sách years
- `POST /vehicles` - Tạo vehicle mới
- `GET /vehicles/:id` - Lấy chi tiết vehicle

### Parts
- `GET /parts` - Lấy danh sách parts
- `POST /parts` - Tạo part mới
- `GET /parts/:id` - Lấy chi tiết part

### Categories
- `GET /part-categories` - Lấy danh sách categories
- `POST /part-categories` - Tạo category mới

### Mappings (Quan trọng nhất)
- `GET /vehicle-part-mappings` - Lấy danh sách mappings
- `GET /vehicle-part-mappings/vehicle/:vehicleId/parts` - Lấy parts cho vehicle
- `GET /vehicle-part-mappings/part/:partId/vehicles` - Lấy vehicles cho part
- `POST /vehicle-part-mappings` - Tạo mapping mới
- `PATCH /vehicle-part-mappings/:id/verify` - Verify mapping

## Bước Tiếp Theo

1. **Thu thập dữ liệu**: Bắt đầu thu thập và nhập dữ liệu từ các catalog aftermarket
2. **Xây dựng Admin CMS**: Hoàn thiện giao diện admin để quản lý dữ liệu
3. **Mở rộng Mobile App**: Thêm tính năng bookmark, search, filters
4. **User-Generated Content**: Xây dựng hệ thống cho phép user/shop đóng góp dữ liệu
5. **Verification System**: Hoàn thiện hệ thống duyệt dữ liệu

## Troubleshooting

### Database connection error
- Kiểm tra PostgreSQL đã chạy chưa
- Kiểm tra thông tin trong file `.env`
- Kiểm tra firewall/port 5432

### Backend không start
- Kiểm tra `npm install` đã chạy chưa
- Kiểm tra database connection
- Xem logs: `npm run start:dev`

### Mobile app không kết nối API
- Kiểm tra `API_BASE_URL` trong `lib/config/api_config.dart`
- Đảm bảo backend đang chạy
- Kiểm tra CORS settings trong backend

