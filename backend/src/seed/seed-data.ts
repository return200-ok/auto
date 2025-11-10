import { DataSource } from 'typeorm';
import { Vehicle } from '../entities/vehicle.entity';
import { PartCategory } from '../entities/part-category.entity';
import { Part } from '../entities/part.entity';
import { VehiclePartMapping } from '../entities/vehicle-part-mapping.entity';

export async function seedDatabase(dataSource: DataSource) {
  const vehicleRepo = dataSource.getRepository(Vehicle);
  const categoryRepo = dataSource.getRepository(PartCategory);
  const partRepo = dataSource.getRepository(Part);
  const mappingRepo = dataSource.getRepository(VehiclePartMapping);

  // Clear existing data
  await mappingRepo.delete({});
  await partRepo.delete({});
  await vehicleRepo.delete({});
  await categoryRepo.delete({});

  console.log('🗑️  Cleared existing data');

  // Seed Categories
  const categories = [
    { name: 'Engine', description: 'Engine parts and components' },
    { name: 'Brake', description: 'Brake system components' },
    { name: 'Suspension', description: 'Suspension components' },
    { name: 'Electrical', description: 'Electrical components' },
    { name: 'Transmission', description: 'Transmission parts' },
    { name: 'Cooling System', description: 'Cooling system components' },
    { name: 'Exhaust', description: 'Exhaust system parts' },
    { name: 'Body & Interior', description: 'Body and interior parts' },
  ];

  const savedCategories = await categoryRepo.save(
    categories.map((cat) => categoryRepo.create(cat)),
  );

  console.log(`✅ Created ${savedCategories.length} categories`);

  // Seed Vehicles - More comprehensive data
  const vehicles = [
    // Toyota Camry
    { make: 'Toyota', model: 'Camry', year: 2020, trim: '2.5Q', engine_code: '2AR-FE' },
    { make: 'Toyota', model: 'Camry', year: 2021, trim: '2.5Q', engine_code: '2AR-FE' },
    { make: 'Toyota', model: 'Camry', year: 2022, trim: '2.5Q', engine_code: '2AR-FE' },
    { make: 'Toyota', model: 'Camry', year: 2020, trim: '2.0G', engine_code: '6AR-FSE' },
    // Toyota Corolla
    { make: 'Toyota', model: 'Corolla', year: 2020, trim: '1.8G', engine_code: '2ZR-FE' },
    { make: 'Toyota', model: 'Corolla', year: 2021, trim: '1.8G', engine_code: '2ZR-FE' },
    // Honda Civic
    { make: 'Honda', model: 'Civic', year: 2020, trim: 'EX', engine_code: 'L15B7' },
    { make: 'Honda', model: 'Civic', year: 2021, trim: 'EX', engine_code: 'L15B7' },
    { make: 'Honda', model: 'Civic', year: 2020, trim: 'RS', engine_code: 'L15B7' },
    // Honda Accord
    { make: 'Honda', model: 'Accord', year: 2020, trim: '2.0T', engine_code: 'K20C3' },
    // Ford Focus
    { make: 'Ford', model: 'Focus', year: 2020, trim: 'Titanium', engine_code: '1.5L EcoBoost' },
  ];

  const savedVehicles = await vehicleRepo.save(
    vehicles.map((v) => vehicleRepo.create(v)),
  );

  console.log(`✅ Created ${savedVehicles.length} vehicles`);

  // Seed Parts - More comprehensive
  const parts = [
    // Engine parts
    {
      category_id: savedCategories[0].category_id,
      oem_number: 'TOY-17801-0E010',
      aftermarket_number: 'DEN-AD-101',
      brand: 'Denso',
      name: 'Air Filter',
      description: 'High-performance air filter for improved engine breathing',
      specs: { size: 'Standard', material: 'Paper', filterType: 'Panel' },
    },
    {
      category_id: savedCategories[0].category_id,
      oem_number: 'TOY-90919-01234',
      aftermarket_number: 'NGK-ILZKR7B-11',
      brand: 'NGK',
      name: 'Spark Plug Set (4 pcs)',
      description: 'Iridium spark plug for better ignition and fuel efficiency',
      specs: { type: 'Iridium', gap: '0.8mm', quantity: 4 },
    },
    {
      category_id: savedCategories[0].category_id,
      oem_number: 'TOY-15620-0E010',
      aftermarket_number: 'DEN-234-9060',
      brand: 'Denso',
      name: 'Oil Filter',
      description: 'Premium oil filter for engine protection',
      specs: { type: 'Spin-on', threadSize: '3/4-16' },
    },
    // Brake parts
    {
      category_id: savedCategories[1].category_id,
      oem_number: 'TOY-04465-02010',
      aftermarket_number: 'BOS-0 986 479 001',
      brand: 'Bosch',
      name: 'Front Brake Pad Set',
      description: 'Premium ceramic brake pads for reliable stopping power',
      specs: { type: 'Ceramic', thickness: '12mm', position: 'Front' },
    },
    {
      category_id: savedCategories[1].category_id,
      oem_number: 'TOY-04466-02020',
      aftermarket_number: 'BOS-0 986 479 002',
      brand: 'Bosch',
      name: 'Rear Brake Pad Set',
      description: 'Premium ceramic brake pads for rear wheels',
      specs: { type: 'Ceramic', thickness: '10mm', position: 'Rear' },
    },
    {
      category_id: savedCategories[1].category_id,
      oem_number: 'TOY-47715-02010',
      aftermarket_number: 'BOS-0 986 479 003',
      brand: 'Bosch',
      name: 'Brake Disc (Front)',
      description: 'Vented brake disc for front wheels',
      specs: { diameter: '296mm', thickness: '28mm', type: 'Vented' },
    },
    // Suspension parts
    {
      category_id: savedCategories[2].category_id,
      oem_number: 'TOY-48510-02010',
      aftermarket_number: 'MON-71850',
      brand: 'Monroe',
      name: 'Front Shock Absorber',
      description: 'Premium shock absorber for smooth ride',
      specs: { type: 'Gas', position: 'Front' },
    },
    {
      category_id: savedCategories[2].category_id,
      oem_number: 'TOY-48520-02020',
      aftermarket_number: 'MON-71851',
      brand: 'Monroe',
      name: 'Rear Shock Absorber',
      description: 'Premium shock absorber for rear suspension',
      specs: { type: 'Gas', position: 'Rear' },
    },
    // Electrical parts
    {
      category_id: savedCategories[3].category_id,
      oem_number: 'TOY-28100-02010',
      aftermarket_number: 'DEN-234-9010',
      brand: 'Denso',
      name: 'Alternator',
      description: 'High-output alternator for reliable charging',
      specs: { output: '120A', voltage: '12V' },
    },
    {
      category_id: savedCategories[3].category_id,
      oem_number: 'TOY-27060-02010',
      aftermarket_number: 'DEN-234-9020',
      brand: 'Denso',
      name: 'Starter Motor',
      description: 'High-torque starter motor',
      specs: { voltage: '12V', power: '1.4kW' },
    },
    // Cooling System
    {
      category_id: savedCategories[5].category_id,
      oem_number: 'TOY-16400-02010',
      aftermarket_number: 'DEN-234-9030',
      brand: 'Denso',
      name: 'Radiator',
      description: 'Aluminum radiator for efficient cooling',
      specs: { material: 'Aluminum', coreType: 'Single' },
    },
    {
      category_id: savedCategories[5].category_id,
      oem_number: 'TOY-16341-02010',
      aftermarket_number: 'GAT-K060330',
      brand: 'Gates',
      name: 'Timing Belt',
      description: 'High-quality timing belt',
      specs: { length: '330mm', width: '19mm', teeth: '110' },
    },
  ];

  const savedParts = await partRepo.save(parts.map((p) => partRepo.create(p)));

  console.log(`✅ Created ${savedParts.length} parts`);

  // Seed Mappings - More comprehensive mappings
  const mappings = [
    // Toyota Camry 2020 mappings
    {
      vehicle_id: savedVehicles[0].vehicle_id, // Camry 2020 2.5Q
      part_id: savedParts[0].part_id, // Air Filter
      fitment_notes: 'Compatible with 2.5L engine (2AR-FE)',
      verified: true,
    },
    {
      vehicle_id: savedVehicles[0].vehicle_id,
      part_id: savedParts[1].part_id, // Spark Plugs
      fitment_notes: 'Set of 4 spark plugs for 2.5L engine',
      verified: true,
    },
    {
      vehicle_id: savedVehicles[0].vehicle_id,
      part_id: savedParts[3].part_id, // Front Brake Pads
      fitment_notes: 'Front brake pads for Camry 2020',
      verified: true,
    },
    {
      vehicle_id: savedVehicles[0].vehicle_id,
      part_id: savedParts[4].part_id, // Rear Brake Pads
      fitment_notes: 'Rear brake pads for Camry 2020',
      verified: true,
    },
    {
      vehicle_id: savedVehicles[0].vehicle_id,
      part_id: savedParts[6].part_id, // Front Shock
      fitment_notes: 'Front shock absorber for Camry',
      verified: true,
    },
    // Toyota Camry 2021 (same parts as 2020)
    {
      vehicle_id: savedVehicles[1].vehicle_id,
      part_id: savedParts[0].part_id,
      fitment_notes: 'Compatible with 2.5L engine (2AR-FE)',
      verified: true,
    },
    {
      vehicle_id: savedVehicles[1].vehicle_id,
      part_id: savedParts[3].part_id,
      fitment_notes: 'Front brake pads for Camry 2021',
      verified: true,
    },
    // Honda Civic 2020 mappings
    {
      vehicle_id: savedVehicles[6].vehicle_id, // Civic 2020 EX
      part_id: savedParts[1].part_id, // Spark Plugs (NGK)
      fitment_notes: 'Set of 4 spark plugs for 1.5L turbo engine',
      verified: true,
    },
    {
      vehicle_id: savedVehicles[6].vehicle_id,
      part_id: savedParts[3].part_id, // Front Brake Pads
      fitment_notes: 'Front brake pads for Civic 2020',
      verified: true,
    },
    // Toyota Corolla 2020
    {
      vehicle_id: savedVehicles[4].vehicle_id, // Corolla 2020
      part_id: savedParts[0].part_id, // Air Filter
      fitment_notes: 'Compatible with 1.8L engine (2ZR-FE)',
      verified: true,
    },
    {
      vehicle_id: savedVehicles[4].vehicle_id,
      part_id: savedParts[3].part_id, // Front Brake Pads
      fitment_notes: 'Front brake pads for Corolla 2020',
      verified: true,
    },
  ];

  await mappingRepo.save(mappings.map((m) => mappingRepo.create(m)));

  console.log(`✅ Created ${mappings.length} vehicle-part mappings`);
  console.log('✅ Database seeded successfully!');
}

