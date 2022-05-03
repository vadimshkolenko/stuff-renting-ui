import { createSlice } from '@reduxjs/toolkit'
import { getAddsQuery } from '../../services'

const initialState = {
  errorMessage: null,
  isLoading: false,
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
  },
})

export const getAdds = () => async (dispatch) => {
  setLoading(true)
  try {
    const response = await getAddsQuery()
    const { data } = response.data
    dispatch(setAddsData(data))
  } catch (err) {
    dispatch(setError(err.error ?? 'Ошибка!'))
  } finally {
    dispatch(setLoading(false))
  }
}

export const { setAddsData, setError, setLoading } = addsSlice.actions

export default addsSlice.reducer
