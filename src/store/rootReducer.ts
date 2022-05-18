import { combineReducers } from '@reduxjs/toolkit'
import accountSlice from './slices/accountSlice'
import addsSlice from './slices/addsSlice'
import adDetailSlice from './slices/adDetailSlice'
import dealsSlice from './slices/dealsSlice'
import notificationsSlice from './slices/notificationsSlice'

const rootReducer = combineReducers({
  account: accountSlice,
  adds: addsSlice,
  adDetail: adDetailSlice,
  deals: dealsSlice,
  notifications: notificationsSlice,
})

export default rootReducer
