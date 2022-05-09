import api from '../utils/api'

export const registrationQuery = (userData) => api.post('/register', userData)

export const confirmQuery = (verificationToken) =>
  api.post('/confirm', { verificationToken })

export const loginQuery = (userData) => api.post('/login', userData)

// TODO переделать на get и не передавать токен (будет в куках)
export const logoutQuery = (token) => api.post('/logout', token)

export const createAddQuery = (addData) => api.post('/createAdd', addData)

export const getAddsQuery = () => api.get('/getAdds')

export const getAdQuery = (id) => api.get(`/getAdDetail/${id}`)

export const requestDealQuery = (dealData) => api.post('/createDeal', dealData)
