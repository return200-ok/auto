class ApiConfig {
  // Thay đổi địa chỉ này khi chạy trên thiết bị thật
  // iOS Simulator: http://localhost:3000
  // Android Emulator: http://10.0.2.2:3000
  // Thiết bị thật: http://<your-computer-ip>:3000
  static const String baseUrl = 'http://localhost:3000';
  
  // Endpoints
  static const String vehicles = '/vehicles';
  static const String parts = '/parts';
  static const String categories = '/part-categories';
  static const String mappings = '/vehicle-part-mappings';
  static const String bookmarks = '/bookmarks';
}

