# Auto Parts Catalog - Dự Án Tra Cứu Phụ Tùng Xe

## Tổng Quan Dự Án

Ứng dụng di động (iOS/Android) hoạt động như một catalog tra cứu phụ tùng chi tiết theo từng đời xe (Make, Model, Year, Trim, Engine).

## Triết Lý Cốt Lõi

**Data-First Approach**: Thành công của dự án phụ thuộc 90% vào việc xây dựng, thu thập và chuẩn hóa cơ sở dữ liệu mapping chính xác giữa xe và phụ tùng.

## Cấu Trúc Dự Án

```
pro auto/
├── backend/          # NestJS API Server
├── admin-cms/        # Web Admin Interface (React/Next.js)
├── mobile-app/       # Flutter Mobile App
└── docs/            # Tài liệu dự án
```

## Tech Stack

- **Backend**: NestJS + PostgreSQL + TypeORM
- **Admin CMS**: React/Next.js
- **Mobile App**: Flutter
- **Database**: PostgreSQL (bắt buộc dùng CSDL quan hệ)

## Yêu Cầu MVP

### Admin CMS
- CRUD cho Vehicle
- CRUD cho Part và PartCategory
- Giao diện Mapping Vehicle ↔ Part
- Hệ thống duyệt (verify) dữ liệu user-generated

### Mobile App
- Chọn xe (Make → Model → Year → Trim/Engine)
- Hiển thị danh mục phụ tùng
- Danh sách phụ tùng theo danh mục
- Chi tiết phụ tùng
- Bookmark/Wishlist

## Cài Đặt và Chạy

### Backend
```bash
cd backend
npm install
npm run start:dev
```

### Admin CMS
```bash
cd admin-cms
npm install
npm run dev
```

### Mobile App
```bash
cd mobile-app
flutter pub get
flutter run
```

## Database Schema

Xem chi tiết trong `docs/database-schema.md`

# auto
