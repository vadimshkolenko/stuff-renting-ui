import api from '../utils/api'

export const registrationQuery = (userData) => api.post('/register', userData)

export const confirmQuery = (verificationToken) =>
  api.post('/confirm', { verificationToken })

export const loginQuery = (userData) => api.post('/login', userData)
