# Hướng dẫn Setup và Sửa lỗi

## Đã hoàn thành

✅ Cấu trúc dự án Flutter
✅ Database schema với Drift
✅ Domain entities và enums
✅ Repository interfaces và implementations
✅ Use cases
✅ Riverpod providers
✅ UI screens cơ bản

## Cần sửa

Có một số lỗi naming conflict giữa database entities (generated) và domain entities. Cần:

1. **Fix model files**: Sử dụng prefix cho database imports
2. **Fix Result pattern**: Thêm getter cho Success/Failure
3. **Fix import paths**: Đảm bảo tất cả imports đúng

## Chạy dự án

```bash
# Install dependencies
flutter pub get

# Generate database code
flutter pub run build_runner build --delete-conflicting-outputs

# Run app
flutter run
```

## Cấu trúc chính

- `lib/domain/` - Business logic, entities
- `lib/data/` - Database, repositories
- `lib/presentation/` - UI, providers
- `lib/core/` - Utilities, theme, constants

## Next Steps

1. Fix naming conflicts trong model files
2. Hoàn thiện các màn hình UI
3. Thêm notification system
4. Thêm charts cho expense statistics
5. Test và debug

