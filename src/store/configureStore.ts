import { AnyAction, configureStore, ThunkAction } from '@reduxjs/toolkit'
import rootReducer from './rootReducer'
import { applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const enhancer = applyMiddleware(thunk)

export const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   AnyAction
// >
