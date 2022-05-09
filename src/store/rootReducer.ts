import { combineReducers } from '@reduxjs/toolkit'
import accountSlice from './slices/accountSlice'
import addsSlice from './slices/addsSlice'
import adDetailSlice from './slices/adDetailSlice'

const rootReducer = combineReducers({
  account: accountSlice,
  adds: addsSlice,
  adDetail: adDetailSlice,
})

export default rootReducer
