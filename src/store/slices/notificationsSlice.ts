import { createSlice } from '@reduxjs/toolkit'
import {
  getCountOfUnreadNotificationsQuery,
  getNotificationsQuery,
} from '../../services'

const initialState = {
  errorMessage: null,
  isLoading: false,
  success: false,
  unreadCount: 0,
  data: [],
}

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotificationsData: (state, action) => {
      state.data = action.payload
      state.unreadCount = 0
    },
    setError: (state, action) => {
      state.errorMessage = action.payload
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setCount: (state, action) => {
      state.unreadCount = action.payload
    },
    setSuccess: (state, action) => {
      state.success = action.payload
    },
    clearData: (state) => {
      state = { ...initialState, unreadCount: state.unreadCount }
      return state
    },
  },
})

export const getNotifications = (userId) => async (dispatch) => {
  dispatch(setLoading(true))
  try {
    const response = await getNotificationsQuery(userId)
    const { data } = response.data
    dispatch(setNotificationsData(data))
    dispatch(setSuccess(true))
  } catch (err) {
    dispatch(setError(err.error ?? 'Ошибка!'))
  } finally {
    dispatch(setLoading(false))
  }
}

export const getCountOfUnreadNotifications = (userId) => async (dispatch) => {
  try {
    const response = await getCountOfUnreadNotificationsQuery(userId)
    const { count } = response.data
    dispatch(setCount(count))
  } catch (err) {
    console.error('Get count of notifications error')
  }
}

export const {
  setNotificationsData,
  setError,
  setLoading,
  setCount,
  setSuccess,
  clearData,
} = notificationsSlice.actions

export default notificationsSlice.reducer
