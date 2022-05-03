import { combineReducers } from '@reduxjs/toolkit'
import accountSlice from './slices/accountSlice'
import addsSlice from './slices/addsSlice'

const rootReducer = combineReducers({ account: accountSlice, adds: addsSlice })

export default rootReducer
