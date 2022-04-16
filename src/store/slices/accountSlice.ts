import { createSlice } from '@reduxjs/toolkit'
import { token as tokenKey, token, userId } from '../../static'

const initialState = {
  token: localStorage.getItem(token) ?? '',
  userId: localStorage.getItem(userId) ?? '',
}

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      const { accessToken, id } = action.payload
      state.token = accessToken
      state.userId = id
    },
  },
})

export const login = (queryCallback, setErrorCallback) => async (dispatch) => {
  try {
    const response = await queryCallback()
    const { token: accessToken, id } = response.data
    localStorage.setItem(tokenKey, accessToken)
    localStorage.setItem(userId, id)
    dispatch(setUserData({ accessToken, id }))
  } catch (err) {
    setErrorCallback(err.error ?? 'Ошибка!')
  }
}

export const { setUserData } = accountSlice.actions

export default accountSlice.reducer
