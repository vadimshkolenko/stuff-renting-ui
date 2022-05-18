import { createSlice } from '@reduxjs/toolkit'
import { getAdQuery } from '../../services'

export interface AddData {
  description: string
  name: string
  price: number
  deposit: string
  assessedValue: string
  Images: Array<any>
  UserId: number
}

const initialState = {
  errorMessage: null,
  isLoading: false,
  data: {
    description: '',
    name: '',
    price: 0,
    deposit: '',
    assessedValue: '',
    Images: [],
    UserId: null,
  },
}

const adDetailSlice = createSlice({
  name: 'adDetail',
  initialState,
  reducers: {
    setAdData: (state, action) => {
      state.data = action.payload
    },
    setError: (state, action) => {
      state.errorMessage = action.payload
    },
    setLoading: (state, action) => {
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
