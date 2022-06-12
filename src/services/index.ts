import api from '../utils/api'

export const registrationQuery = (userData) => api.post('/register', userData)

export const confirmQuery = (verificationToken) =>
  api.post('/confirm', { verificationToken })

export const loginQuery = (userData) => api.post('/login', userData)

// TODO переделать на get и не передавать токен (будет в куках)
export const logoutQuery = (token) => api.post('/logout', token)

export const createAddQuery = (addData) => api.post('/createAdd', addData)

export const updateAddQuery = (addData) => api.patch('/updateAd', addData)

export const getAddsQuery = () => api.get('/getAdds')

export const getUserAdsQuery = (id) => api.get(`/getUserAds/${id}`)

export const getAdQuery = (id) => api.get(`/getAdDetail/${id}`)

export const requestDealQuery = (dealData) => api.post('/createDeal', dealData)

export const getDealsQuery = (role, id) => api.get(`/getDeals/${role}/${id}`)

export const changeDealStatusQuery = (approveData) =>
  api.patch('/changeDealStatus', approveData)

export const cancelDealRequestQuery = (id, role) =>
  api.delete(`/cancelDealRequest/${id}/${role}`)

export const getNotificationsQuery = (userId) =>
  api.get(`/notifications/${userId}`)

export const getCountOfUnreadNotificationsQuery = (userId) =>
  api.get(`/countOfUnreadNotifications/${userId}`)

export const createBillQuery = (paymentData) =>
  api.post('/createBill', paymentData)

export const getPaymentLink = (dealId, amount) =>
  api.get(`/getPaymentLink/${dealId}/${amount}`)

export const addToFavoriteQuery = (data) => api.put('/addToFavorite', data)
export const deleteFromFavoriteQuery = (data) =>
  api.put('/deleteFromFavorite', data)

export const getFavoriteQuery = (userId) => api.get(`/getFavorite/${userId}`)

export const checkIsFavoriteQuery = (userId, adId) =>
  api.get(`/checkIsFavorite/${userId}/${adId}`)
