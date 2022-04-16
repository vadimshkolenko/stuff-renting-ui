import { combineReducers } from '@reduxjs/toolkit'
import accountSlice from './slices/accountSlice'

const rootReducer = combineReducers({ account: accountSlice })

export default rootReducer
