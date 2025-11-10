import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:flutter_staggered_animations/flutter_staggered_animations.dart';
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
        elevation: 0,
      ),
      body: vehicleProvider.isLoading && vehicleProvider.makes.isEmpty
          ? const Center(child: CircularProgressIndicator())
          : SingleChildScrollView(
              padding: const EdgeInsets.all(20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  // Header
                  AnimationConfiguration.staggeredList(
                    position: 0,
                    duration: const Duration(milliseconds: 400),
                    child: SlideAnimation(
                      verticalOffset: 30.0,
                      child: FadeInAnimation(
                        child: Column(
                          children: [
                            Container(
                              width: 80,
                              height: 80,
                              decoration: BoxDecoration(
                                color: Theme.of(context).colorScheme.primaryContainer,
                                shape: BoxShape.circle,
                              ),
                              child: Icon(
                                Icons.directions_car,
                                size: 40,
                                color: Theme.of(context).colorScheme.primary,
                              ),
                            ),
                            const SizedBox(height: 16),
                            Text(
                              'Choose your vehicle',
                              style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                                    fontWeight: FontWeight.bold,
                                  ),
                            ),
                            const SizedBox(height: 8),
                            Text(
                              'Select make, model, and year',
                              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                                    color: Colors.grey[600],
                                  ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                  
                  const SizedBox(height: 32),

                  // Make Selection
                  AnimationConfiguration.staggeredList(
                    position: 1,
                    duration: const Duration(milliseconds: 400),
                    child: SlideAnimation(
                      verticalOffset: 30.0,
                      child: FadeInAnimation(
                        child: _SelectionCard(
                          title: 'Make',
                          icon: Icons.branding_watermark,
                          child: DropdownButtonFormField<String>(
                            value: vehicleProvider.selectedMake,
                            decoration: const InputDecoration(
                              labelText: 'Select Make',
                              prefixIcon: Icon(Icons.car_rental),
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
                        ),
                      ),
                    ),
                  ),

                  const SizedBox(height: 16),

                  // Model Selection
                  if (vehicleProvider.selectedMake != null)
                    AnimationConfiguration.staggeredList(
                      position: 2,
                      duration: const Duration(milliseconds: 400),
                      child: SlideAnimation(
                        verticalOffset: 30.0,
                        child: FadeInAnimation(
                          child: _SelectionCard(
                            title: 'Model',
                            icon: Icons.directions_car,
                            child: vehicleProvider.isLoading
                                ? const Center(
                                    child: Padding(
                                      padding: EdgeInsets.all(16.0),
                                      child: CircularProgressIndicator(),
                                    ),
                                  )
                                : DropdownButtonFormField<String>(
                                    value: vehicleProvider.selectedModel,
                                    decoration: const InputDecoration(
                                      labelText: 'Select Model',
                                      prefixIcon: Icon(Icons.model_training),
                                    ),
                                    items: vehicleProvider.models
                                        .map((model) => DropdownMenuItem(
                                              value: model,
                                              child: Text(model),
                                            ))
                                        .toList(),
                                    onChanged: (model) {
                                      if (model != null &&
                                          vehicleProvider.selectedMake != null) {
                                        vehicleProvider.loadYears(
                                          vehicleProvider.selectedMake!,
                                          model,
                                        );
                                      }
                                    },
                                  ),
                          ),
                        ),
                      ),
                    ),

                  const SizedBox(height: 16),

                  // Year Selection
                  if (vehicleProvider.selectedModel != null)
                    AnimationConfiguration.staggeredList(
                      position: 3,
                      duration: const Duration(milliseconds: 400),
                      child: SlideAnimation(
                        verticalOffset: 30.0,
                        child: FadeInAnimation(
                          child: _SelectionCard(
                            title: 'Year',
                            icon: Icons.calendar_today,
                            child: vehicleProvider.isLoading
                                ? const Center(
                                    child: Padding(
                                      padding: EdgeInsets.all(16.0),
                                      child: CircularProgressIndicator(),
                                    ),
                                  )
                                : DropdownButtonFormField<int>(
                                    value: vehicleProvider.selectedYear,
                                    decoration: const InputDecoration(
                                      labelText: 'Select Year',
                                      prefixIcon: Icon(Icons.date_range),
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
                          ),
                        ),
                      ),
                    ),

                  const SizedBox(height: 32),

                  // Continue Button
                  if (vehicleProvider.selectedVehicle != null)
                    AnimationConfiguration.staggeredList(
                      position: 4,
                      duration: const Duration(milliseconds: 400),
                      child: SlideAnimation(
                        verticalOffset: 30.0,
                        child: FadeInAnimation(
                          child: SizedBox(
                            height: 56,
                            child: ElevatedButton(
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
                                backgroundColor: Theme.of(context).colorScheme.primary,
                                foregroundColor: Colors.white,
                                elevation: 4,
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(16),
                                ),
                              ),
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  const Icon(Icons.arrow_forward, size: 24),
                                  const SizedBox(width: 12),
                                  Text(
                                    'View Compatible Parts',
                                    style: Theme.of(context).textTheme.titleMedium?.copyWith(
                                          color: Colors.white,
                                          fontWeight: FontWeight.w600,
                                        ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                ],
              ),
            ),
    );
  }
}

class _SelectionCard extends StatelessWidget {
  final String title;
  final IconData icon;
  final Widget child;

  const _SelectionCard({
    required this.title,
    required this.icon,
    required this.child,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 2,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(16),
      ),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Container(
                  padding: const EdgeInsets.all(8),
                  decoration: BoxDecoration(
                    color: Theme.of(context).colorScheme.primaryContainer,
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Icon(
                    icon,
                    size: 20,
                    color: Theme.of(context).colorScheme.primary,
                  ),
                ),
                const SizedBox(width: 12),
                Text(
                  title,
                  style: Theme.of(context).textTheme.titleMedium?.copyWith(
                        fontWeight: FontWeight.w600,
                      ),
                ),
              ],
            ),
            const SizedBox(height: 16),
            child,
          ],
        ),
      ),
    );
  }
}

