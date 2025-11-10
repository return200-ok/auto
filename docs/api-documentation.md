# API Documentation - Auto Parts Catalog

Tài liệu đầy đủ về các API endpoints của hệ thống.

## Base URL

```
http://localhost:3000
```

## Authentication

Hiện tại API chưa có authentication. Sẽ được thêm trong các phiên bản sau.

## Endpoints

### Vehicles

#### Lấy danh sách tất cả makes
```
GET /vehicles/makes
```

Response:
```json
["Toyota", "Honda", "Ford", ...]
```

#### Lấy danh sách models theo make
```
GET /vehicles/models?make=Toyota
```

Response:
```json
["Camry", "Corolla", "RAV4", ...]
```

#### Lấy danh sách years theo make và model
```
GET /vehicles/years?make=Toyota&model=Camry
```

Response:
```json
[2023, 2022, 2021, ...]
```

#### Lấy danh sách vehicles
```
GET /vehicles?make=Toyota&model=Camry&year=2020
```

Query Parameters:
- `make` (optional): Filter by make
- `model` (optional): Filter by model
- `year` (optional): Filter by year

Response:
```json
[
  {
    "vehicle_id": 1,
    "make": "Toyota",
    "model": "Camry",
    "year": 2020,
    "trim": "2.5Q",
    "engine_code": "2AR-FE",
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
]
```

#### Tạo vehicle mới
```
POST /vehicles
```

Body:
```json
{
  "make": "Toyota",
  "model": "Camry",
  "year": 2020,
  "trim": "2.5Q",
  "engine_code": "2AR-FE"
}
```

#### Lấy chi tiết vehicle
```
GET /vehicles/:id
```

#### Cập nhật vehicle
```
PATCH /vehicles/:id
```

#### Xóa vehicle
```
DELETE /vehicles/:id
```

### Parts

#### Lấy danh sách parts
```
GET /parts?categoryId=1&brand=Denso
```

Query Parameters:
- `categoryId` (optional): Filter by category
- `brand` (optional): Filter by brand
- `oemNumber` (optional): Filter by OEM number
- `aftermarketNumber` (optional): Filter by aftermarket number

Response:
```json
[
  {
    "part_id": 1,
    "category_id": 1,
    "oem_number": "TOY-12345",
    "aftermarket_number": "DEN-67890",
    "brand": "Denso",
    "name": "Air Filter",
    "description": "High-performance air filter",
    "specs": {"size": "Standard"},
    "image_url": "https://...",
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
]
```

#### Tạo part mới
```
POST /parts
```

Body:
```json
{
  "category_id": 1,
  "oem_number": "TOY-12345",
  "aftermarket_number": "DEN-67890",
  "brand": "Denso",
  "name": "Air Filter",
  "description": "High-performance air filter",
  "specs": {"size": "Standard", "material": "Paper"},
  "image_url": "https://example.com/image.jpg"
}
```

#### Lấy chi tiết part
```
GET /parts/:id
```

Response bao gồm cả thông tin về các vehicles tương thích.

### Categories

#### Lấy danh sách categories
```
GET /part-categories?parentId=1
```

Query Parameters:
- `parentId` (optional): Filter by parent category ID

#### Tạo category mới
```
POST /part-categories
```

Body:
```json
{
  "name": "Engine",
  "parent_category_id": null,
  "description": "Engine parts and components"
}
```

### Vehicle-Part Mappings (Core Functionality)

#### Lấy danh sách mappings
```
GET /vehicle-part-mappings?vehicleId=1&partId=1&verified=true
```

Query Parameters:
- `vehicleId` (optional): Filter by vehicle
- `partId` (optional): Filter by part
- `verified` (optional): Filter by verification status

#### Lấy parts cho một vehicle
```
GET /vehicle-part-mappings/vehicle/:vehicleId/parts
```

Response:
```json
[
  {
    "mapping_id": 1,
    "vehicle_id": 1,
    "part_id": 1,
    "fitment_notes": "Compatible with 2.5L engine",
    "verified": true,
    "part": {
      "part_id": 1,
      "name": "Air Filter",
      ...
    }
  }
]
```

#### Lấy vehicles cho một part
```
GET /vehicle-part-mappings/part/:partId/vehicles
```

#### Tạo mapping mới
```
POST /vehicle-part-mappings
```

Body:
```json
{
  "vehicle_id": 1,
  "part_id": 1,
  "fitment_notes": "Compatible with 2.5L engine",
  "created_by": 1
}
```

#### Verify mapping
```
PATCH /vehicle-part-mappings/:id/verify
```

Body:
```json
{
  "verifiedBy": 1
}
```

### Bookmarks

#### Lấy bookmarks của user
```
GET /bookmarks?userId=1
```

#### Tạo bookmark mới
```
POST /bookmarks
```

Body:
```json
{
  "user_id": 1,
  "part_id": 1,
  "vehicle_id": 1,
  "notes": "Need to buy this"
}
```

## Error Responses

Tất cả các lỗi đều trả về format:

```json
{
  "statusCode": 404,
  "message": "Vehicle with ID 999 not found",
  "error": "Not Found"
}
```

Status Codes:
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `404`: Not Found
- `409`: Conflict (e.g., duplicate mapping)
- `500`: Internal Server Error

