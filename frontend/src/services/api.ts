import axios from 'axios'

const API = axios.create({
  baseURL: (import.meta as any).env?.VITE_FINEX_API_URL || 'http://localhost:8003',
})

export const getDashboard = () => API.get('/api/v1/dashboard').then(r => r.data)
export const getTodayBriefing = () => API.get('/api/v1/briefing/today').then(r => r.data)
export const getBriefingHistory = (limit = 30) =>
  API.get(`/api/v1/briefing/history?limit=${limit}`).then(r => r.data)
