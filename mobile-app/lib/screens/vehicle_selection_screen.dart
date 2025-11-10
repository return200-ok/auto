import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/vehicle_provider.dart';
import '../providers/part_provider.dart';
import 'parts_list_screen.dart';

class VehicleSelectionScreen extends StatefulWidget {
  const VehicleSelectionScreen({super.key});

  @override
  State<VehicleSelectionScreen> createState() => _VehicleSelectionScreenState();
}

class _VehicleSelectionScreenState extends State<VehicleSelectionScreen> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<VehicleProvider>().loadMakes();
    });
  }

  @override
  Widget build(BuildContext context) {
    final vehicleProvider = context.watch<VehicleProvider>();

    return Scaffold(
      appBar: AppBar(
        title: const Text('Select Your Vehicle'),
      ),
      body: vehicleProvider.isLoading
          ? const Center(child: CircularProgressIndicator())
          : SingleChildScrollView(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  // Make Selection
                  DropdownButtonFormField<String>(
                    value: vehicleProvider.selectedMake,
                    decoration: const InputDecoration(
                      labelText: 'Make',
                      border: OutlineInputBorder(),
                    ),
                    items: vehicleProvider.makes
                        .map((make) => DropdownMenuItem(
                              value: make,
                              child: Text(make),
                            ))
                        .toList(),
                    onChanged: (make) {
                      if (make != null) {
                        vehicleProvider.loadModels(make);
                      }
                    },
                  ),
                  const SizedBox(height: 16),

                  // Model Selection
                  if (vehicleProvider.selectedMake != null)
                    DropdownButtonFormField<String>(
                      value: vehicleProvider.selectedModel,
                      decoration: const InputDecoration(
                        labelText: 'Model',
                        border: OutlineInputBorder(),
                      ),
                      items: vehicleProvider.models
                          .map((model) => DropdownMenuItem(
                                value: model,
                                child: Text(model),
                              ))
                          .toList(),
                      onChanged: (model) {
                        if (model != null && vehicleProvider.selectedMake != null) {
                          vehicleProvider.loadYears(
                            vehicleProvider.selectedMake!,
                            model,
                          );
                        }
                      },
                    ),
                  const SizedBox(height: 16),

                  // Year Selection
                  if (vehicleProvider.selectedModel != null)
                    DropdownButtonFormField<int>(
                      value: vehicleProvider.selectedYear,
                      decoration: const InputDecoration(
                        labelText: 'Year',
                        border: OutlineInputBorder(),
                      ),
                      items: vehicleProvider.years
                          .map((year) => DropdownMenuItem(
                                value: year,
                                child: Text(year.toString()),
                              ))
                          .toList(),
                      onChanged: (year) {
                        if (year != null) {
                          vehicleProvider.selectVehicle(year);
                        }
                      },
                    ),
                  const SizedBox(height: 32),

                  // Continue Button
                  if (vehicleProvider.selectedVehicle != null)
                    ElevatedButton(
                      onPressed: () {
                        final vehicle = vehicleProvider.selectedVehicle!;
                        context.read<PartProvider>().loadPartsByVehicle(
                              vehicle.vehicleId,
                            );
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => const PartsListScreen(),
                          ),
                        );
                      },
                      style: ElevatedButton.styleFrom(
                        padding: const EdgeInsets.symmetric(vertical: 16),
                      ),
                      child: const Text('View Compatible Parts'),
                    ),
                ],
              ),
            ),
    );
  }
}

