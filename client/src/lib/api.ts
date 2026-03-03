import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Menu API
export const menuApi = {
    getAll: (params?: any) => api.get('/menu', { params }),
    getOne: (id: string) => api.get(`/menu/${id}`),
    create: (data: any) => api.post('/menu', data),
    update: (id: string, data: any) => api.put(`/menu/${id}`, data),
    delete: (id: string) => api.delete(`/menu/${id}`),
};

// Reservations API
export const reservationApi = {
    getAll: (params?: any) => api.get('/reservations', { params }),
    getOne: (id: string) => api.get(`/reservations/${id}`),
    create: (data: any) => api.post('/reservations', data),
    update: (id: string, data: any) => api.put(`/reservations/${id}`, data),
    delete: (id: string) => api.delete(`/reservations/${id}`),
};

// Contacts API (if needed)
export const contactApi = {
    getAll: () => api.get('/contacts'),
    create: (data: any) => api.post('/contacts', data),
    update: (id: string, data: any) => api.put(`/contacts/${id}`, data),
    delete: (id: string) => api.delete(`/contacts/${id}`),
};

export default api;
