import { createSlice } from '@reduxjs/toolkit'
import { getAdQuery } from '../../services'

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
    // count: 0,
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

export const { setAdData, setError, setLoading } = adDetailSlice.actions

export default adDetailSlice.reducer
