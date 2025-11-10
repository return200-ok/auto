import 'package:flutter/foundation.dart';
import '../models/vehicle.dart';
import '../services/api_service.dart';

class VehicleProvider with ChangeNotifier {
  List<String> _makes = [];
  List<String> _models = [];
  List<int> _years = [];
  Vehicle? _selectedVehicle;
  String? _selectedMake;
  String? _selectedModel;
  int? _selectedYear;

  List<String> get makes => _makes;
  List<String> get models => _models;
  List<int> get years => _years;
  Vehicle? get selectedVehicle => _selectedVehicle;
  String? get selectedMake => _selectedMake;
  String? get selectedModel => _selectedModel;
  int? get selectedYear => _selectedYear;

  bool _isLoading = false;
  bool get isLoading => _isLoading;

  Future<void> loadMakes() async {
    _isLoading = true;
    notifyListeners();
    try {
      _makes = await ApiService.getMakes();
    } catch (e) {
      debugPrint('Error loading makes: $e');
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<void> loadModels(String make) async {
    _selectedMake = make;
    _isLoading = true;
    notifyListeners();
    try {
      _models = await ApiService.getModels(make);
    } catch (e) {
      debugPrint('Error loading models: $e');
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<void> loadYears(String make, String model) async {
    _selectedModel = model;
    _isLoading = true;
    notifyListeners();
    try {
      _years = await ApiService.getYears(make, model);
    } catch (e) {
      debugPrint('Error loading years: $e');
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<void> selectVehicle(int year) async {
    _selectedYear = year;
    _isLoading = true;
    notifyListeners();
    try {
      final vehicles = await ApiService.getVehicles(
        make: _selectedMake,
        model: _selectedModel,
        year: year,
      );
      if (vehicles.isNotEmpty) {
        _selectedVehicle = vehicles.first;
      }
    } catch (e) {
      debugPrint('Error selecting vehicle: $e');
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  void reset() {
    _selectedVehicle = null;
    _selectedMake = null;
    _selectedModel = null;
    _selectedYear = null;
    _models = [];
    _years = [];
    notifyListeners();
  }
}

