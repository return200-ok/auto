# Database Schema - Auto Parts Catalog

## Tổng Quan

Hệ thống sử dụng PostgreSQL để đảm bảo tính chặt chẽ của mapping giữa xe và phụ tùng.

## Các Bảng Chính

### 1. Vehicle (Xe)
Lưu trữ thông tin các đời xe.

```sql
CREATE TABLE vehicles (
    vehicle_id SERIAL PRIMARY KEY,
    make VARCHAR(100) NOT NULL,           -- Hãng (Toyota, Honda, ...)
    model VARCHAR(100) NOT NULL,          -- Dòng (Camry, Civic, ...)
    year INTEGER NOT NULL,                -- Năm sản xuất
    trim VARCHAR(100),                    -- Phiên bản (2.5Q, EX, ...)
    engine_code VARCHAR(50),              -- Mã động cơ
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(make, model, year, trim, engine_code)
);
```

### 2. PartCategory (Danh Mục Phụ Tùng)
Danh mục đa cấp cho phụ tùng.

```sql
CREATE TABLE part_categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,           -- Tên danh mục
    parent_category_id INTEGER,           -- FK cho danh mục cha
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (parent_category_id) REFERENCES part_categories(category_id)
);
```

### 3. Part (Phụ Tùng)
Thông tin chi tiết về phụ tùng.

```sql
CREATE TABLE parts (
    part_id SERIAL PRIMARY KEY,
    category_id INTEGER NOT NULL,
    oem_number VARCHAR(100),              -- Mã OEM
    aftermarket_number VARCHAR(100),      -- Mã aftermarket
    brand VARCHAR(100),                   -- Thương hiệu (Denso, Bosch, ...)
    name VARCHAR(255) NOT NULL,           -- Tên phụ tùng
    description TEXT,
    specs JSONB,                          -- Thông số kỹ thuật (JSON)
    image_url VARCHAR(500),               -- URL hình ảnh
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (category_id) REFERENCES part_categories(category_id)
);
```

### 4. VehiclePartMapping (Mapping Xe - Phụ Tùng)
Bảng quan trọng nhất: mapping giữa xe và phụ tùng.

```sql
CREATE TABLE vehicle_part_mappings (
    mapping_id SERIAL PRIMARY KEY,
    vehicle_id INTEGER NOT NULL,
    part_id INTEGER NOT NULL,
    fitment_notes TEXT,                   -- Ghi chú (vd: "Chỉ dùng cho động cơ 2.0L")
    verified BOOLEAN DEFAULT FALSE,        -- Đã được duyệt chưa
    verified_by INTEGER,                   -- User ID người duyệt
    verified_at TIMESTAMP,
    created_by INTEGER,                   -- User ID người tạo
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(vehicle_id) ON DELETE CASCADE,
    FOREIGN KEY (part_id) REFERENCES parts(part_id) ON DELETE CASCADE,
    UNIQUE(vehicle_id, part_id)
);
```

### 5. Seller (Người Bán - Chuẩn Bị GĐ2)
Thông tin người bán phụ tùng.

```sql
CREATE TABLE sellers (
    seller_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    rating DECIMAL(3,2),                  -- Điểm đánh giá (0-5)
    contact_info JSONB,                   -- Thông tin liên hệ (JSON)
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

### 6. SellerListing (Sản Phẩm Người Bán - Chuẩn Bị GĐ2)
Danh sách phụ tùng mà seller đang bán.

```sql
CREATE TABLE seller_listings (
    listing_id SERIAL PRIMARY KEY,
    seller_id INTEGER NOT NULL,
    part_id INTEGER NOT NULL,
    price DECIMAL(10,2),
    status VARCHAR(20) DEFAULT 'new',    -- 'new' hoặc 'used'
    condition_description TEXT,
    stock_quantity INTEGER,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (seller_id) REFERENCES sellers(seller_id) ON DELETE CASCADE,
    FOREIGN KEY (part_id) REFERENCES parts(part_id) ON DELETE CASCADE
);
```

### 7. User (Người Dùng)
Thông tin người dùng hệ thống (cho admin và user-generated content).

```sql
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    role VARCHAR(20) DEFAULT 'user',      -- 'admin', 'moderator', 'user'
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

### 8. UserBookmark (Bookmark của User)
Phụ tùng user đã bookmark.

```sql
CREATE TABLE user_bookmarks (
    bookmark_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    part_id INTEGER NOT NULL,
    vehicle_id INTEGER,                   -- Xe mà user đang quan tâm
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (part_id) REFERENCES parts(part_id) ON DELETE CASCADE,
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(vehicle_id) ON DELETE SET NULL,
    UNIQUE(user_id, part_id, vehicle_id)
);
```

## Indexes

Để tối ưu hiệu suất truy vấn:

```sql
CREATE INDEX idx_vehicles_make_model ON vehicles(make, model);
CREATE INDEX idx_vehicles_year ON vehicles(year);
CREATE INDEX idx_parts_category ON parts(category_id);
CREATE INDEX idx_parts_oem ON parts(oem_number);
CREATE INDEX idx_parts_aftermarket ON parts(aftermarket_number);
CREATE INDEX idx_mappings_vehicle ON vehicle_part_mappings(vehicle_id);
CREATE INDEX idx_mappings_part ON vehicle_part_mappings(part_id);
CREATE INDEX idx_bookmarks_user ON user_bookmarks(user_id);
```

