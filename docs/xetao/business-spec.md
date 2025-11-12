# Business Specification - Xe Tao

## Vấn đề cần giải quyết

Chủ xe ô tô tại Việt Nam gặp khó khăn trong việc:
- Nhớ lịch bảo dưỡng định kỳ
- Theo dõi chi phí vận hành xe
- Đặt lịch hẹn với gara
- Nhớ các hạn định kỳ (đăng kiểm, bảo hiểm, phí đường bộ)

## Giải pháp

Ứng dụng "Xe Tao" cung cấp:
1. Hệ thống nhắc bảo dưỡng tự động
2. Công cụ ghi chép và thống kê chi phí
3. Tính năng đặt lịch với gara
4. Nhắc nhở các hạn định kỳ
5. Tiện ích bổ sung (giá xăng, mẹo chăm xe)

## Chức năng chính

### 1. Nhắc bảo dưỡng định kỳ

**Mô tả**: Hệ thống tự động nhắc người dùng khi đến hạn bảo dưỡng

**Yêu cầu**:
- Người dùng nhập thông tin xe (hãng, đời, số km hiện tại, ngày bảo dưỡng gần nhất)
- App tự động nhắc bảo dưỡng theo mốc (ví dụ: mỗi 5.000 km hoặc 6 tháng)
- Có thể chọn "bảo dưỡng nhỏ / lớn" để nhắc theo chu kỳ khác nhau
- Cho phép người dùng đánh dấu "đã bảo dưỡng"

**Quy tắc nghiệp vụ**:
- Bảo dưỡng nhỏ: mỗi 5.000 km hoặc 6 tháng
- Bảo dưỡng lớn: mỗi 20.000 km hoặc 12 tháng
- Nhắc trước 300 km hoặc 7 ngày

### 2. Thống kê chi phí vận hành

**Mô tả**: Ghi chép và thống kê tất cả chi phí liên quan đến xe

**Yêu cầu**:
- Mục ghi chép chi phí (xăng, bảo dưỡng, sửa chữa, phụ tùng, phí cầu đường…)
- Hiển thị biểu đồ/tổng chi theo tháng, năm
- Cho phép xuất dữ liệu (CSV hoặc PDF) nếu cần

**Danh mục chi phí**:
- Xăng dầu
- Bảo dưỡng
- Sửa chữa
- Phụ tùng
- Phí cầu đường
- Bảo hiểm
- Đăng kiểm
- Khác

### 3. Đặt lịch sửa xe / bảo dưỡng

**Mô tả**: Cho phép người dùng đặt lịch hẹn với gara

**Yêu cầu**:
- Danh sách gara uy tín (dữ liệu tĩnh trước, có thể mở rộng)
- Cho phép chọn ngày, giờ, gara → lưu vào lịch hẹn
- Gửi thông báo nhắc lại trước lịch hẹn
- Không cần tài khoản, lưu dữ liệu cục bộ

### 4. Nhắc các hạn định kỳ khác

**Mô tả**: Nhắc nhở các hạn quan trọng khác

**Yêu cầu**:
- Cho phép người dùng nhập ngày hết hạn:
  - Đăng kiểm
  - Bảo hiểm
  - Phí đường bộ
- App tự động nhắc trước X ngày (mặc định 7)

### 5. Tiện ích thêm

**Mô tả**: Các tính năng bổ sung hữu ích

**Yêu cầu**:
- Cập nhật giá xăng dầu (qua API công khai hoặc dữ liệu định kỳ)
- Gợi ý mẹo chăm xe hoặc checklist trước khi đi xa (mục "Mẹo nhỏ")

## Yêu cầu UX/UI

- Giao diện hiện đại, tối giản, phù hợp người dùng Việt 25–45 tuổi
- Màu chủ đạo: xanh đen hoặc xám bạc (gợi liên tưởng ô tô)
- Các màn hình chính:
  - Trang chủ (tổng quan xe & thông báo nhắc bảo dưỡng)
  - Lịch nhắc (bảo dưỡng, đăng kiểm, bảo hiểm)
  - Ghi chép chi phí (và biểu đồ)
  - Gara / đặt lịch
  - Cài đặt (thông tin xe, mốc nhắc)

## Logic vận hành

- Khi cài đặt lần đầu → app hỏi nhập:
  - Tên xe, hãng, đời, km hiện tại, ngày bảo dưỡng gần nhất
- Hệ thống tự tính:
  - Mốc bảo dưỡng tiếp theo (hiển thị km hoặc ngày dự kiến)
  - Thông báo khi sắp tới hạn (ví dụ: còn 300 km hoặc 7 ngày)
- Các chi phí nhập tay → tự động tính tổng / tháng / năm
- Dữ liệu không đồng bộ lên cloud (ưu tiên riêng tư, không đăng nhập)

## Mục tiêu MVP

- Cho phép nhập thông tin xe + nhắc bảo dưỡng
- Cho phép thêm chi phí + hiển thị thống kê
- Cho phép đặt lịch bảo dưỡng và nhận thông báo nhắc
- Giao diện thuần Việt, dễ thao tác, chạy ổn trên Android

## Mục tiêu v2 (nâng cao)

- Gợi ý gara gần nhất theo vị trí GPS
- API giá xăng thời gian thực
- Xuất báo cáo tổng chi phí PDF
- Tự động đồng bộ nếu người dùng bật cloud backup

