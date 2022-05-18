import { createSlice } from '@reduxjs/toolkit'
import { getAddsQuery } from '../../services'

const initialState = {
  errorMessage: null,
  isLoading: false,
  success: false,
  data: [],
}

const addsSlice = createSlice({
  name: 'adds',
  initialState,
  reducers: {
    setAddsData: (state, action) => {
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
    setSuccess: (state, action) => {
      state.success = action.payload
    },
  },
})

export const getAdds = () => async (dispatch) => {
  dispatch(setLoading(true))
  try {
    const response = await getAddsQuery()
    const { data } = response.data
    dispatch(setAddsData(data))
    dispatch(setSuccess(true))
  } catch (err) {
    dispatch(setError(err.error ?? 'Ошибка!'))
  } finally {
    dispatch(setLoading(false))
  }
}

export const { setAddsData, setError, setLoading, clearData, setSuccess } =
  addsSlice.actions

export default addsSlice.reducer
