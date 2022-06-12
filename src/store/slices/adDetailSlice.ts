import { createSlice } from '@reduxjs/toolkit'
import { getAdQuery, checkIsFavoriteQuery } from '../../services'
import { Ad } from '../../interfaces/ads'
import { UserId, UserId as currentUserId } from '../../static'

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
    switchFavorite: (state) => {
      state.data.isFavorite = !state.data.isFavorite
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
    const { data: adData } = response.data
    const isFavoriteResponse = await checkIsFavoriteQuery(
      localStorage.getItem(currentUserId),
      id
    )
    const { data: isFavoriteData } = isFavoriteResponse
    dispatch(setAdData({ ...adData, isFavorite: isFavoriteData.isFavorite }))
  } catch (err) {
    dispatch(setError(err.error ?? 'Ошибка!'))
  } finally {
    dispatch(setLoading(false))
  }
}

export const { setAdData, setError, setLoading, clearData, switchFavorite } =
  adDetailSlice.actions

export default adDetailSlice.reducer
