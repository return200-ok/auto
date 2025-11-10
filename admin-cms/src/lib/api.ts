import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Vehicles
export const vehicleApi = {
  getAll: (filters?: { make?: string; model?: string; year?: number }) =>
    api.get('/vehicles', { params: filters }),
  getMakes: () => api.get('/vehicles/makes'),
  getModels: (make: string) => api.get('/vehicles/models', { params: { make } }),
  getYears: (make: string, model: string) =>
    api.get('/vehicles/years', { params: { make, model } }),
  getById: (id: number) => api.get(`/vehicles/${id}`),
  create: (data: any) => api.post('/vehicles', data),
  update: (id: number, data: any) => api.patch(`/vehicles/${id}`, data),
  delete: (id: number) => api.delete(`/vehicles/${id}`),
};

// Parts
export const partApi = {
  getAll: (filters?: {
    categoryId?: number;
    brand?: string;
    oemNumber?: string;
    aftermarketNumber?: string;
  }) => api.get('/parts', { params: filters }),
  getById: (id: number) => api.get(`/parts/${id}`),
  create: (data: any) => api.post('/parts', data),
  update: (id: number, data: any) => api.patch(`/parts/${id}`, data),
  delete: (id: number) => api.delete(`/parts/${id}`),
};

// Categories
export const categoryApi = {
  getAll: (parentId?: number) =>
    api.get('/part-categories', { params: { parentId } }),
  getById: (id: number) => api.get(`/part-categories/${id}`),
  create: (data: any) => api.post('/part-categories', data),
  update: (id: number, data: any) => api.patch(`/part-categories/${id}`, data),
  delete: (id: number) => api.delete(`/part-categories/${id}`),
};

// Mappings
export const mappingApi = {
  getAll: (filters?: {
    vehicleId?: number;
    partId?: number;
    verified?: boolean;
  }) => api.get('/vehicle-part-mappings', { params: filters }),
  getPartsByVehicle: (vehicleId: number) =>
    api.get(`/vehicle-part-mappings/vehicle/${vehicleId}/parts`),
  getVehiclesByPart: (partId: number) =>
    api.get(`/vehicle-part-mappings/part/${partId}/vehicles`),
  getById: (id: number) => api.get(`/vehicle-part-mappings/${id}`),
  create: (data: any) => api.post('/vehicle-part-mappings', data),
  update: (id: number, data: any) =>
    api.patch(`/vehicle-part-mappings/${id}`, data),
  verify: (id: number, verifiedBy: number) =>
    api.patch(`/vehicle-part-mappings/${id}/verify`, { verifiedBy }),
  delete: (id: number) => api.delete(`/vehicle-part-mappings/${id}`),
};

export default api;

