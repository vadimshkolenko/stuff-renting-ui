import api from '../utils/api'

export const registrationQuery = (userData) => api.post('/register', userData)

export const confirmQuery = (verificationToken) =>
  api.post('/confirm', { verificationToken })

export const loginQuery = (userData) => api.post('/login', userData)

// переделать на get и не передавать токен (будет в куках)
export const logoutQuery = (token) => api.post('/logout', token)

export const createAddQuery = (addData) => api.post('/createAdd', addData)

export const getAddsQuery = () => api.get('/getAdds')
