import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

const incidentService = {
  getAll: (filters = {}) =>
    api.get('/incidents', { params: filters }).then((r) => r.data.data),

  getById: (id) =>
    api.get(`/incidents/${id}`).then((r) => r.data.data),

  create: (payload) =>
    api.post('/incidents', payload).then((r) => r.data.data),

  update: (id, payload) =>
    api.patch(`/incidents/${id}`, payload).then((r) => r.data.data),

  remove: (id) =>
    api.delete(`/incidents/${id}`),
};

export default incidentService;