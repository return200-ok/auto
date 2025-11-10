class Vehicle {
  final int vehicleId;
  final String make;
  final String model;
  final int year;
  final String? trim;
  final String? engineCode;

  Vehicle({
    required this.vehicleId,
    required this.make,
    required this.model,
    required this.year,
    this.trim,
    this.engineCode,
  });

  factory Vehicle.fromJson(Map<String, dynamic> json) {
    return Vehicle(
      vehicleId: json['vehicle_id'],
      make: json['make'],
      model: json['model'],
      year: json['year'],
      trim: json['trim'],
      engineCode: json['engine_code'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'vehicle_id': vehicleId,
      'make': make,
      'model': model,
      'year': year,
      'trim': trim,
      'engine_code': engineCode,
    };
  }

  String get displayName => '$make $model ($year)';
}

