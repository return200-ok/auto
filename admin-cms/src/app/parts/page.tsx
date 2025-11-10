'use client';

import { useState, useEffect } from 'react';
import { partApi, categoryApi } from '@/lib/api';
import Link from 'next/link';
import { Plus, Edit, Trash2, Search } from 'lucide-react';

interface Part {
  part_id: number;
  category_id: number;
  oem_number?: string;
  aftermarket_number?: string;
  brand?: string;
  name: string;
  description?: string;
  specs?: any;
  image_url?: string;
  category?: { name: string };
}

export default function PartsPage() {
  const [parts, setParts] = useState<Part[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    categoryId: '',
    brand: '',
    oemNumber: '',
    aftermarketNumber: '',
  });

  useEffect(() => {
    loadParts();
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await categoryApi.getAll();
      setCategories(response.data);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const loadParts = async () => {
    try {
      setLoading(true);
      const params: any = {};
      if (filters.categoryId) params.categoryId = parseInt(filters.categoryId);
      if (filters.brand) params.brand = filters.brand;
      if (filters.oemNumber) params.oemNumber = filters.oemNumber;
      if (filters.aftermarketNumber) params.aftermarketNumber = filters.aftermarketNumber;
      const response = await partApi.getAll(params);
      setParts(response.data);
    } catch (error) {
      console.error('Error loading parts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this part?')) return;
    try {
      await partApi.delete(id);
      loadParts();
    } catch (error) {
      console.error('Error deleting part:', error);
      alert('Error deleting part');
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Parts Management</h1>
          <Link
            href="/parts/new"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus size={20} />
            Add Part
          </Link>
        </div>

        {/* Search Filters */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                value={filters.categoryId}
                onChange={(e) => setFilters({ ...filters, categoryId: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.category_id} value={cat.category_id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Brand</label>
              <input
                type="text"
                value={filters.brand}
                onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="e.g., Denso"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">OEM Number</label>
              <input
                type="text"
                value={filters.oemNumber}
                onChange={(e) => setFilters({ ...filters, oemNumber: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="e.g., TOY-12345"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={loadParts}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                <Search size={20} />
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Parts Table */}
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Brand</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">OEM</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aftermarket</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {parts.map((part) => (
                  <tr key={part.part_id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{part.part_id}</td>
                    <td className="px-6 py-4 text-sm font-medium">{part.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {part.category?.name || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{part.brand || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-xs">
                      {part.oem_number || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-xs">
                      {part.aftermarket_number || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex gap-2">
                        <Link
                          href={`/parts/${part.part_id}/edit`}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Edit size={16} />
                        </Link>
                        <button
                          onClick={() => handleDelete(part.part_id)}
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
            {parts.length === 0 && (
              <div className="text-center py-8 text-gray-500">No parts found</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

