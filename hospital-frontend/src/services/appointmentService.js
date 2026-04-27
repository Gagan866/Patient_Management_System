import api from './api'

export const getAppointments = () => api.get('/appointments')
export const createAppointment = (appointment) => api.post('/appointments', appointment)
export const updateAppointment = (id, appointment) => api.put(`/appointments/${id}`, appointment)
export const deleteAppointment = (id) => api.delete(`/appointments/${id}`)
