import { combineReducers } from '@reduxjs/toolkit'
import accountSlice from './slices/accountSlice'
import addsSlice from './slices/addsSlice'
import adDetailSlice from './slices/adDetailSlice'
import dealsSlice from './slices/dealsSlice'

const rootReducer = combineReducers({
  account: accountSlice,
  adds: addsSlice,
  adDetail: adDetailSlice,
  deals: dealsSlice,
})

export default rootReducer
