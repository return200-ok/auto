'use client';

import { useState, useEffect } from 'react';
import { mappingApi, vehicleApi, partApi } from '@/lib/api';
import Link from 'next/link';
import { Plus, CheckCircle, XCircle, Search } from 'lucide-react';

interface Mapping {
  mapping_id: number;
  vehicle_id: number;
  part_id: number;
  fitment_notes?: string;
  verified: boolean;
  vehicle?: { make: string; model: string; year: number };
  part?: { name: string; brand?: string };
}

export default function MappingsPage() {
  const [mappings, setMappings] = useState<Mapping[]>([]);
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [parts, setParts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    vehicleId: '',
    partId: '',
    verified: '',
  });
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newMapping, setNewMapping] = useState({
    vehicle_id: '',
    part_id: '',
    fitment_notes: '',
  });

  useEffect(() => {
    loadMappings();
    loadVehicles();
    loadParts();
  }, []);

  const loadVehicles = async () => {
    try {
      const response = await vehicleApi.getAll();
      setVehicles(response.data);
    } catch (error) {
      console.error('Error loading vehicles:', error);
    }
  };

  const loadParts = async () => {
    try {
      const response = await partApi.getAll();
      setParts(response.data);
    } catch (error) {
      console.error('Error loading parts:', error);
    }
  };

  const loadMappings = async () => {
    try {
      setLoading(true);
      const params: any = {};
      if (filters.vehicleId) params.vehicleId = parseInt(filters.vehicleId);
      if (filters.partId) params.partId = parseInt(filters.partId);
      if (filters.verified !== '') params.verified = filters.verified === 'true';
      const response = await mappingApi.getAll(params);
      setMappings(response.data);
    } catch (error) {
      console.error('Error loading mappings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await mappingApi.create({
        vehicle_id: parseInt(newMapping.vehicle_id),
        part_id: parseInt(newMapping.part_id),
        fitment_notes: newMapping.fitment_notes,
      });
      setShowCreateForm(false);
      setNewMapping({ vehicle_id: '', part_id: '', fitment_notes: '' });
      loadMappings();
    } catch (error: any) {
      console.error('Error creating mapping:', error);
      alert(error.response?.data?.message || 'Error creating mapping');
    }
  };

  const handleVerify = async (id: number) => {
    try {
      await mappingApi.verify(id, 1); // TODO: Use actual user ID
      loadMappings();
    } catch (error) {
      console.error('Error verifying mapping:', error);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Vehicle-Part Mappings</h1>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus size={20} />
            {showCreateForm ? 'Cancel' : 'Add Mapping'}
          </button>
        </div>

        {/* Create Form */}
        {showCreateForm && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">Create New Mapping</h2>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Vehicle *</label>
                  <select
                    required
                    value={newMapping.vehicle_id}
                    onChange={(e) => setNewMapping({ ...newMapping, vehicle_id: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    <option value="">Select Vehicle</option>
                    {vehicles.map((v) => (
                      <option key={v.vehicle_id} value={v.vehicle_id}>
                        {v.make} {v.model} {v.year} {v.trim ? `(${v.trim})` : ''}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Part *</label>
                  <select
                    required
                    value={newMapping.part_id}
                    onChange={(e) => setNewMapping({ ...newMapping, part_id: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    <option value="">Select Part</option>
                    {parts.map((p) => (
                      <option key={p.part_id} value={p.part_id}>
                        {p.name} {p.brand ? `(${p.brand})` : ''}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Fitment Notes</label>
                  <input
                    type="text"
                    value={newMapping.fitment_notes}
                    onChange={(e) => setNewMapping({ ...newMapping, fitment_notes: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="e.g., Compatible with 2.5L engine"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Create Mapping
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Vehicle</label>
              <select
                value={filters.vehicleId}
                onChange={(e) => setFilters({ ...filters, vehicleId: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="">All Vehicles</option>
                {vehicles.map((v) => (
                  <option key={v.vehicle_id} value={v.vehicle_id}>
                    {v.make} {v.model} {v.year}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Part</label>
              <select
                value={filters.partId}
                onChange={(e) => setFilters({ ...filters, partId: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="">All Parts</option>
                {parts.map((p) => (
                  <option key={p.part_id} value={p.part_id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Verified</label>
              <select
                value={filters.verified}
                onChange={(e) => setFilters({ ...filters, verified: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="">All</option>
                <option value="true">Verified</option>
                <option value="false">Not Verified</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={loadMappings}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                <Search size={20} />
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Mappings Table */}
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vehicle</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Part</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Notes</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {mappings.map((mapping) => (
                  <tr key={mapping.mapping_id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{mapping.mapping_id}</td>
                    <td className="px-6 py-4 text-sm">
                      {mapping.vehicle
                        ? `${mapping.vehicle.make} ${mapping.vehicle.model} ${mapping.vehicle.year}`
                        : `Vehicle #${mapping.vehicle_id}`}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {mapping.part ? mapping.part.name : `Part #${mapping.part_id}`}
                    </td>
                    <td className="px-6 py-4 text-sm">{mapping.fitment_notes || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {mapping.verified ? (
                        <span className="flex items-center gap-1 text-green-600">
                          <CheckCircle size={16} />
                          Verified
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-yellow-600">
                          <XCircle size={16} />
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {!mapping.verified && (
                        <button
                          onClick={() => handleVerify(mapping.mapping_id)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Verify
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {mappings.length === 0 && (
              <div className="text-center py-8 text-gray-500">No mappings found</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

