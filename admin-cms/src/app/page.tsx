'use client';

import Link from 'next/link';
import { Car, Settings, FolderTree, Link2 } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Auto Parts Catalog</h1>
          <p className="text-gray-600 text-lg">Admin CMS - Manage your parts database</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/vehicles"
            className="group p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-all border-2 border-transparent hover:border-blue-500"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                <Car className="text-blue-600" size={24} />
              </div>
              <h2 className="text-2xl font-semibold">Vehicles</h2>
            </div>
            <p className="text-gray-600">Manage vehicle makes, models, years, and trims</p>
          </Link>

          <Link
            href="/parts"
            className="group p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-all border-2 border-transparent hover:border-green-500"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="p-3 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                <Settings className="text-green-600" size={24} />
              </div>
              <h2 className="text-2xl font-semibold">Parts</h2>
            </div>
            <p className="text-gray-600">Manage parts catalog with OEM and aftermarket numbers</p>
          </Link>

          <Link
            href="/categories"
            className="group p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-all border-2 border-transparent hover:border-purple-500"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="p-3 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                <FolderTree className="text-purple-600" size={24} />
              </div>
              <h2 className="text-2xl font-semibold">Categories</h2>
            </div>
            <p className="text-gray-600">Manage part categories and hierarchy</p>
          </Link>

          <Link
            href="/mappings"
            className="group p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-all border-2 border-transparent hover:border-orange-500"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="p-3 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-colors">
                <Link2 className="text-orange-600" size={24} />
              </div>
              <h2 className="text-2xl font-semibold">Mappings</h2>
            </div>
            <p className="text-gray-600">Map vehicles to parts - Core functionality</p>
          </Link>
        </div>

        <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-2">📊 Quick Stats</h3>
          <p className="text-sm text-blue-700">
            This is the data management interface for the Auto Parts Catalog. Use the sections above to manage vehicles, parts, categories, and their relationships.
          </p>
        </div>
      </div>
    </main>
  );
}

