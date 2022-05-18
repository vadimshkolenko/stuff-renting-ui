import { createSlice } from '@reduxjs/toolkit'
import { getAdQuery } from '../../services'
import { Ad } from '../../interfaces/ads'

interface State {
  errorMessage: string | null
  isLoading: boolean
  data: Ad
}

const initialState = {
  errorMessage: null,
  isLoading: false,
  data: {},
}

const adDetailSlice = createSlice({
  name: 'adDetail',
  initialState,
  reducers: {
    setAdData: (state: State, action: { payload: Ad }) => {
      state.data = action.payload
    },
    setError: (state: State, action: { payload: string }) => {
      state.errorMessage = action.payload
    },
    setLoading: (state, action: { payload: boolean }) => {
      state.isLoading = action.payload
    },
    clearData: (state) => {
      state = initialState
      return state
    },
  },
})

export const getAd = (id) => async (dispatch) => {
  dispatch(setLoading(true))
  try {
    const response = await getAdQuery(id)
    const { data } = response.data
    dispatch(setAdData(data))
  } catch (err) {
    dispatch(setError(err.error ?? 'Ошибка!'))
  } finally {
    dispatch(setLoading(false))
  }
}

export const { setAdData, setError, setLoading, clearData } =
  adDetailSlice.actions

export default adDetailSlice.reducer
