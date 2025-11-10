# Auto Parts Catalog - Dự Án Tra Cứu Phụ Tùng Xe

## 📋 Tổng Quan Dự Án

Ứng dụng di động (iOS/Android) hoạt động như một catalog tra cứu phụ tùng chi tiết theo từng đời xe (Make, Model, Year, Trim, Engine).

## 🎯 Triết Lý Cốt Lõi

**Data-First Approach**: Thành công của dự án phụ thuộc 90% vào việc xây dựng, thu thập và chuẩn hóa cơ sở dữ liệu mapping chính xác giữa xe và phụ tùng.

## 🏗️ Cấu Trúc Dự Án

```
auto-vision/
├── backend/          # NestJS API Server
├── admin-cms/        # Web Admin Interface (Next.js)
├── mobile-app/       # Flutter Mobile App
├── docs/            # Tài liệu dự án
└── docker-compose.yml
```

## 🛠️ Tech Stack

- **Backend**: NestJS + PostgreSQL + TypeORM
- **Admin CMS**: Next.js 14 + React + Tailwind CSS
- **Mobile App**: Flutter 3.x
- **Database**: PostgreSQL 15+ (bắt buộc dùng CSDL quan hệ)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL 15+ (hoặc Docker)
- Flutter 3.x
- Docker & Docker Compose (optional)

### 1. Khởi động Database và Backend

```bash
# Sử dụng Docker Compose
docker-compose up -d

# Hoặc chạy backend thủ công
cd backend
npm install
cp .env.example .env  # Cấu hình database
npm run seed          # Seed dữ liệu mẫu
npm run start:dev     # Chạy trên http://localhost:3000
```

### 2. Khởi động Admin CMS

```bash
cd admin-cms
npm install
echo "NEXT_PUBLIC_API_URL=http://localhost:3000" > .env.local
npm run dev           # Chạy trên http://localhost:3001
```

### 3. Khởi động Mobile App

```bash
cd mobile-app
flutter pub get
flutter run           # Chạy trên iOS/Android simulator
```

## 📱 Yêu Cầu MVP

### Admin CMS ✅
- ✅ CRUD cho Vehicle
- ✅ CRUD cho Part và PartCategory
- ✅ Giao diện Mapping Vehicle ↔ Part
- ✅ Hệ thống duyệt (verify) dữ liệu

### Mobile App ✅
- ✅ Chọn xe (Make → Model → Year → Trim/Engine)
- ✅ Hiển thị danh mục phụ tùng
- ✅ Danh sách phụ tùng theo danh mục
- ✅ Chi tiết phụ tùng
- 🔄 Bookmark/Wishlist (đang phát triển)

## 📊 Database Schema

Xem chi tiết trong `docs/database-schema.md`

### Các bảng chính:
- `vehicles` - Thông tin xe
- `parts` - Thông tin phụ tùng
- `part_categories` - Danh mục phụ tùng
- `vehicle_part_mappings` - Mapping xe ↔ phụ tùng (quan trọng nhất)
- `sellers` - Người bán (chuẩn bị cho GĐ2)
- `seller_listings` - Sản phẩm người bán (chuẩn bị cho GĐ2)
- `user_bookmarks` - Bookmark của user

## 🔌 API Endpoints

### Vehicles
- `GET /vehicles` - Lấy danh sách vehicles
- `GET /vehicles/makes` - Lấy danh sách makes
- `GET /vehicles/models?make=...` - Lấy danh sách models
- `GET /vehicles/years?make=...&model=...` - Lấy danh sách years
- `POST /vehicles` - Tạo vehicle mới
- `GET /vehicles/:id` - Lấy chi tiết vehicle
- `PATCH /vehicles/:id` - Cập nhật vehicle
- `DELETE /vehicles/:id` - Xóa vehicle

### Parts
- `GET /parts` - Lấy danh sách parts (có filters)
- `POST /parts` - Tạo part mới
- `GET /parts/:id` - Lấy chi tiết part
- `PATCH /parts/:id` - Cập nhật part
- `DELETE /parts/:id` - Xóa part

### Categories
- `GET /part-categories` - Lấy danh sách categories
- `POST /part-categories` - Tạo category mới
- `GET /part-categories/:id` - Lấy chi tiết category
- `PATCH /part-categories/:id` - Cập nhật category
- `DELETE /part-categories/:id` - Xóa category

### Mappings (Core)
- `GET /vehicle-part-mappings` - Lấy danh sách mappings
- `GET /vehicle-part-mappings/vehicle/:vehicleId/parts` - Lấy parts cho vehicle
- `GET /vehicle-part-mappings/part/:partId/vehicles` - Lấy vehicles cho part
- `POST /vehicle-part-mappings` - Tạo mapping mới
- `PATCH /vehicle-part-mappings/:id/verify` - Verify mapping
- `DELETE /vehicle-part-mappings/:id` - Xóa mapping

Xem đầy đủ trong `docs/api-documentation.md`

## 📈 Roadmap

### Giai đoạn 1: MVP (Hiện tại) ✅
- ✅ Backend API đầy đủ
- ✅ Admin CMS để quản lý dữ liệu
- ✅ Mobile App cơ bản
- ✅ Seed data mẫu

### Giai đoạn 2: Mở rộng
- 🔄 User authentication & authorization
- 🔄 Bookmark/Wishlist trong mobile app
- 🔄 User-generated content (shop/garage đóng góp)
- 🔄 Verification system nâng cao

### Giai đoạn 3: Tính năng nâng cao
- 📍 Gợi ý Shop dựa trên GPS
- 💰 So sánh giá giữa các shop
- 🔍 Tra cứu phụ tùng cũ
- 🔢 VIN Decoder nâng cao
- 📷 AR Scan (nhận diện phụ tùng)

## 📝 Chiến Lược Dữ Liệu

1. **Bắt đầu**: Thu thập từ catalog aftermarket (Denso, Bosch, NGK, Monroe, Gates...)
2. **Song song**: User-generated content với verification
3. **Dài hạn**: OEM EPC data (mua bản quyền hoặc scrape)

## 🐛 Troubleshooting

### Database connection error
- Kiểm tra PostgreSQL đã chạy chưa
- Kiểm tra thông tin trong file `.env` của backend
- Kiểm tra firewall/port 5432

### Backend không start
- Kiểm tra `npm install` đã chạy chưa
- Kiểm tra database connection
- Xem logs: `npm run start:dev`

### Mobile app không kết nối API
- Kiểm tra `API_BASE_URL` trong `lib/config/api_config.dart`
- Đảm bảo backend đang chạy
- Kiểm tra CORS settings trong backend (đã cấu hình cho development)

## 📚 Documentation

- [Database Schema](./docs/database-schema.md)
- [API Documentation](./docs/api-documentation.md)
- [Getting Started](./docs/getting-started.md)

## 👥 Contributing

Dự án này tập trung vào việc xây dựng và chuẩn hóa dữ liệu. Mọi đóng góp về dữ liệu đều được hoan nghênh!

## 📄 License

UNLICENSED - Private project
