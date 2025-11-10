import 'dart:convert';
import 'package:http/http.dart' as http;
import '../config/api_config.dart';
import '../models/vehicle.dart';
import '../models/part.dart';
import '../models/part_category.dart';

class ApiService {
  static Future<List<String>> getMakes() async {
    final response = await http.get(
      Uri.parse('${ApiConfig.baseUrl}${ApiConfig.vehicles}/makes'),
    );
    if (response.statusCode == 200) {
      return List<String>.from(json.decode(response.body));
    }
    throw Exception('Failed to load makes');
  }

  static Future<List<String>> getModels(String make) async {
    final response = await http.get(
      Uri.parse('${ApiConfig.baseUrl}${ApiConfig.vehicles}/models?make=$make'),
    );
    if (response.statusCode == 200) {
      return List<String>.from(json.decode(response.body));
    }
    throw Exception('Failed to load models');
  }

  static Future<List<int>> getYears(String make, String model) async {
    final response = await http.get(
      Uri.parse(
          '${ApiConfig.baseUrl}${ApiConfig.vehicles}/years?make=$make&model=$model'),
    );
    if (response.statusCode == 200) {
      return List<int>.from(json.decode(response.body));
    }
    throw Exception('Failed to load years');
  }

  static Future<List<Vehicle>> getVehicles({
    String? make,
    String? model,
    int? year,
  }) async {
    final queryParams = <String, String>{};
    if (make != null) queryParams['make'] = make;
    if (model != null) queryParams['model'] = model;
    if (year != null) queryParams['year'] = year.toString();

    final uri = Uri.parse('${ApiConfig.baseUrl}${ApiConfig.vehicles}')
        .replace(queryParameters: queryParams);
    final response = await http.get(uri);

    if (response.statusCode == 200) {
      final List<dynamic> data = json.decode(response.body);
      return data.map((json) => Vehicle.fromJson(json)).toList();
    }
    throw Exception('Failed to load vehicles');
  }

  static Future<List<PartCategory>> getCategories({int? parentId}) async {
    final queryParams = <String, String>{};
    if (parentId != null) queryParams['parentId'] = parentId.toString();

    final uri = Uri.parse('${ApiConfig.baseUrl}${ApiConfig.categories}')
        .replace(queryParameters: queryParams);
    final response = await http.get(uri);

    if (response.statusCode == 200) {
      final List<dynamic> data = json.decode(response.body);
      return data.map((json) => PartCategory.fromJson(json)).toList();
    }
    throw Exception('Failed to load categories');
  }

  static Future<List<Part>> getPartsByVehicle(int vehicleId) async {
    final response = await http.get(
      Uri.parse(
          '${ApiConfig.baseUrl}${ApiConfig.mappings}/vehicle/$vehicleId/parts'),
    );
    if (response.statusCode == 200) {
      final List<dynamic> data = json.decode(response.body);
      return data
          .map((json) => Part.fromJson(json['part'] ?? json))
          .toList();
    }
    throw Exception('Failed to load parts');
  }

  static Future<Part> getPartDetails(int partId) async {
    final response = await http.get(
      Uri.parse('${ApiConfig.baseUrl}${ApiConfig.parts}/$partId'),
    );
    if (response.statusCode == 200) {
      return Part.fromJson(json.decode(response.body));
    }
    throw Exception('Failed to load part details');
  }
}

