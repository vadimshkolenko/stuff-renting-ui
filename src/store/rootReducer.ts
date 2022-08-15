import { combineReducers } from '@reduxjs/toolkit'
import accountSlice from './slices/accountSlice'
import adsSlice from './slices/adsSlice'
import adDetailSlice from './slices/adDetailSlice'
import dealsSlice from './slices/dealsSlice'
import notificationsSlice from './slices/notificationsSlice'

const rootReducer = combineReducers({
  account: accountSlice,
  ads: adsSlice,
  adDetail: adDetailSlice,
  deals: dealsSlice,
  notifications: notificationsSlice,
})

export default rootReducer
