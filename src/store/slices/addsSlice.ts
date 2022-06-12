import { createSlice } from '@reduxjs/toolkit'
import { getAddsQuery, getUserAdsQuery } from '../../services'
import { Ad } from '../../interfaces/ads'

interface State {
  errorMessage: string | null
  isLoading: boolean
  success: boolean
  data: Array<Ad>
}

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
    setAddsData: (state: State, action: { payload: Array<Ad> }) => {
      state.data = action.payload
    },
    setError: (state: State, action: { payload: string }) => {
      state.errorMessage = action.payload
    },
    setLoading: (state: State, action: { payload: boolean }) => {
      state.isLoading = action.payload
    },
    clearData: (state: State) => {
      state = initialState
      return state
    },
    setSuccess: (state: State, action: { payload: boolean }) => {
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

export const getUserAds = (id: string) => async (dispatch) => {
  dispatch(setLoading(true))
  try {
    const response = await getUserAdsQuery(id)
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
