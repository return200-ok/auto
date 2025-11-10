'use client';

import { useState, useEffect } from 'react';
import { vehicleApi } from '@/lib/api';
import Link from 'next/link';
import { Plus, Edit, Trash2, Search } from 'lucide-react';

interface Vehicle {
  vehicle_id: number;
  make: string;
  model: string;
  year: number;
  trim?: string;
  engine_code?: string;
  created_at: string;
  updated_at: string;
}

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchMake, setSearchMake] = useState('');
  const [searchModel, setSearchModel] = useState('');
  const [makes, setMakes] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);

  useEffect(() => {
    loadVehicles();
    loadMakes();
  }, []);

  useEffect(() => {
    if (searchMake) {
      loadModels(searchMake);
    } else {
      setModels([]);
    }
  }, [searchMake]);

  const loadMakes = async () => {
    try {
      const response = await vehicleApi.getMakes();
      setMakes(response.data);
    } catch (error) {
      console.error('Error loading makes:', error);
    }
  };

  const loadModels = async (make: string) => {
    try {
      const response = await vehicleApi.getModels(make);
      setModels(response.data);
    } catch (error) {
      console.error('Error loading models:', error);
    }
  };

  const loadVehicles = async () => {
    try {
      setLoading(true);
      const filters: any = {};
      if (searchMake) filters.make = searchMake;
      if (searchModel) filters.model = searchModel;
      const response = await vehicleApi.getAll(filters);
      setVehicles(response.data);
    } catch (error) {
      console.error('Error loading vehicles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this vehicle?')) return;
    try {
      await vehicleApi.delete(id);
      loadVehicles();
    } catch (error) {
      console.error('Error deleting vehicle:', error);
      alert('Error deleting vehicle');
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Vehicles Management</h1>
          <Link
            href="/vehicles/new"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus size={20} />
            Add Vehicle
          </Link>
        </div>

        {/* Search Filters */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Make</label>
              <select
                value={searchMake}
                onChange={(e) => {
                  setSearchMake(e.target.value);
                  setSearchModel('');
                }}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="">All Makes</option>
                {makes.map((make) => (
                  <option key={make} value={make}>
                    {make}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Model</label>
              <select
                value={searchModel}
                onChange={(e) => setSearchModel(e.target.value)}
                disabled={!searchMake}
                className="w-full px-3 py-2 border rounded-lg disabled:bg-gray-100"
              >
                <option value="">All Models</option>
                {models.map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={loadVehicles}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                <Search size={20} />
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Vehicles Table */}
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Make</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Model</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Year</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trim</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Engine</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {vehicles.map((vehicle) => (
                  <tr key={vehicle.vehicle_id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{vehicle.vehicle_id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{vehicle.make}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{vehicle.model}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{vehicle.year}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{vehicle.trim || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{vehicle.engine_code || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex gap-2">
                        <Link
                          href={`/vehicles/${vehicle.vehicle_id}/edit`}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Edit size={16} />
                        </Link>
                        <button
                          onClick={() => handleDelete(vehicle.vehicle_id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {vehicles.length === 0 && (
              <div className="text-center py-8 text-gray-500">No vehicles found</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

