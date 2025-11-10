import 'package:flutter/foundation.dart';
import '../models/part.dart';
import '../models/part_category.dart';
import '../services/api_service.dart';

class PartProvider with ChangeNotifier {
  List<PartCategory> _categories = [];
  List<Part> _parts = [];
  Part? _selectedPart;

  List<PartCategory> get categories => _categories;
  List<Part> get parts => _parts;
  Part? get selectedPart => _selectedPart;

  bool _isLoading = false;
  bool get isLoading => _isLoading;

  Future<void> loadCategories({int? parentId}) async {
    _isLoading = true;
    notifyListeners();
    try {
      _categories = await ApiService.getCategories(parentId: parentId);
    } catch (e) {
      debugPrint('Error loading categories: $e');
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<void> loadPartsByVehicle(int vehicleId) async {
    _isLoading = true;
    notifyListeners();
    try {
      _parts = await ApiService.getPartsByVehicle(vehicleId);
    } catch (e) {
      debugPrint('Error loading parts: $e');
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<void> loadPartDetails(int partId) async {
    _isLoading = true;
    notifyListeners();
    try {
      _selectedPart = await ApiService.getPartDetails(partId);
    } catch (e) {
      debugPrint('Error loading part details: $e');
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }
}

