import { createSlice } from '@reduxjs/toolkit'
import { getAdsQuery, getFavoriteQuery, getUserAdsQuery } from '../../services'
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

const adsSlice = createSlice({
  name: 'ads',
  initialState,
  reducers: {
    setAdsData: (state: State, action: { payload: Array<Ad> }) => {
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

export const getAds = () => async (dispatch) => {
  dispatch(setLoading(true))
  try {
    const response = await getAdsQuery()
    const { data } = response.data
    dispatch(setAdsData(data))
    dispatch(setSuccess(true))
  } catch (err) {
    dispatch(setError(err.error ?? 'Ошибка!'))
  } finally {
    dispatch(setLoading(false))
  }
}

export const getUserAds =
  (id: string, isFavorite?: boolean) => async (dispatch) => {
    dispatch(setLoading(true))
    try {
      const response = await (isFavorite ? getFavoriteQuery : getUserAdsQuery)(
        id
      )
      const { data } = response.data
      dispatch(setAdsData(data))
      dispatch(setSuccess(true))
    } catch (err) {
      dispatch(setError(err.error ?? 'Ошибка!'))
    } finally {
      dispatch(setLoading(false))
    }
  }

export const { setAdsData, setError, setLoading, clearData, setSuccess } =
  adsSlice.actions

export default adsSlice.reducer
