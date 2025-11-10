import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/part_provider.dart';
import '../providers/vehicle_provider.dart';
import 'part_details_screen.dart';

class PartsListScreen extends StatelessWidget {
  const PartsListScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final partProvider = context.watch<PartProvider>();
    final vehicleProvider = context.watch<VehicleProvider>();

    return Scaffold(
      appBar: AppBar(
        title: Text(
          vehicleProvider.selectedVehicle?.displayName ?? 'Parts',
        ),
      ),
      body: partProvider.isLoading
          ? const Center(child: CircularProgressIndicator())
          : partProvider.parts.isEmpty
              ? const Center(
                  child: Padding(
                    padding: EdgeInsets.all(32.0),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(Icons.inventory_2_outlined, size: 64, color: Colors.grey),
                        SizedBox(height: 16),
                        Text(
                          'No parts found for this vehicle',
                          style: TextStyle(fontSize: 16, color: Colors.grey),
                        ),
                      ],
                    ),
                  ),
                )
              : ListView.builder(
                      padding: const EdgeInsets.all(8),
                      itemCount: partProvider.parts.length,
                      itemBuilder: (context, index) {
                        final part = partProvider.parts[index];
                        return Card(
                          margin: const EdgeInsets.symmetric(vertical: 4, horizontal: 8),
                          child: ListTile(
                            leading: part.imageUrl != null
                                ? ClipRRect(
                                    borderRadius: BorderRadius.circular(8),
                                    child: Image.network(
                                      part.imageUrl!,
                                      width: 60,
                                      height: 60,
                                      fit: BoxFit.cover,
                                      errorBuilder: (context, error, stackTrace) =>
                                          const Icon(Icons.image_not_supported, size: 40),
                                    ),
                                  )
                                : Container(
                                    width: 60,
                                    height: 60,
                                    decoration: BoxDecoration(
                                      color: Colors.grey[200],
                                      borderRadius: BorderRadius.circular(8),
                                    ),
                                    child: const Icon(Icons.settings, size: 30),
                                  ),
                            title: Text(
                              part.name,
                              style: const TextStyle(fontWeight: FontWeight.bold),
                            ),
                            subtitle: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                if (part.brand != null)
                                  Text(
                                    part.brand!,
                                    style: TextStyle(color: Colors.grey[600]),
                                  ),
                                const SizedBox(height: 4),
                                if (part.oemNumber != null)
                                  Text(
                                    'OEM: ${part.oemNumber}',
                                    style: const TextStyle(
                                      fontSize: 12,
                                      fontFamily: 'monospace',
                                    ),
                                  )
                                else if (part.aftermarketNumber != null)
                                  Text(
                                    'Aftermarket: ${part.aftermarketNumber}',
                                    style: const TextStyle(
                                      fontSize: 12,
                                      fontFamily: 'monospace',
                                    ),
                                  ),
                              ],
                            ),
                            trailing: const Icon(Icons.chevron_right),
                            onTap: () {
                              partProvider.loadPartDetails(part.partId);
                              Navigator.push(
                                context,
                                MaterialPageRoute(
                                  builder: (context) => const PartDetailsScreen(),
                                ),
                              );
                            },
                          ),
                        );
                      },
                    ),
    );
  }
}

