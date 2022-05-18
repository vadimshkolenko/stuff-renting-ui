import { createSlice } from '@reduxjs/toolkit'
import {
  changeDealStatusQuery,
  getDealsQuery,
  cancelDealRequestQuery,
} from '../../services'
import { renter } from '../../static'

const initialState = {
  errorMessage: null,
  isLoading: false,
  renterDeals: [],
  landlordDeals: [],
}

type Deal = 'renterDeals' | 'landlordDeals'

const dealsSlice = createSlice({
  name: 'deals',
  initialState,
  reducers: {
    setRenterDealsData: (state, action) => {
      state.renterDeals = action.payload
    },
    setLandlordDealsData: (state, action) => {
      state.landlordDeals = action.payload
    },
    setError: (state, action) => {
      state.errorMessage = action.payload
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
    clearData: (state, action) => {
      const role = action.payload
      if (role === renter) {
        state.renterDeals = []
      } else {
        state.landlordDeals = []
      }
    },
    changeStatus: (state, action) => {
      const { typeOfDeal, dealId, newStatus } = action.payload
      state[typeOfDeal] = state[typeOfDeal].map((deal) =>
        deal.id === dealId ? { ...deal, status: newStatus } : deal
      )
    },
    cancelDeal: (state, action) => {
      const { typeOfDeal, dealId } = action.payload
      state[typeOfDeal] = state[typeOfDeal].filter((deal) => deal.id !== dealId)
    },
  },
})

export const getDeals = (role: string) => async (dispatch, getState) => {
  const userId = getState().account.UserId
  setLoading(true)
  try {
    const response = await getDealsQuery(role, userId)
    const { data } = response.data
    if (role === renter) {
      dispatch(setRenterDealsData(data))
    } else {
      dispatch(setLandlordDealsData(data))
    }
  } catch (err) {
    dispatch(setError(err.error ?? 'Ошибка!'))
  } finally {
    dispatch(setLoading(false))
  }
}

interface ChangeStatusData {
  typeOfDeal: Deal
  dealId: number
  landlordId: number
  newStatus: string
}

export const changeDealStatus =
  ({ typeOfDeal, dealId, landlordId, newStatus }: ChangeStatusData) =>
  async (dispatch) => {
    setLoading(true)
    try {
      await changeDealStatusQuery({
        dealId,
        landlordId,
        newStatus,
      })
      dispatch(changeStatus({ typeOfDeal, dealId, newStatus }))
    } catch (err) {
      dispatch(setError(err.error ?? 'Ошибка!'))
    } finally {
      dispatch(setLoading(false))
    }
  }

export const cancelDealRequest =
  ({ typeOfDeal, dealId }) =>
  async (dispatch) => {
    setLoading(true)
    try {
      await cancelDealRequestQuery(dealId, typeOfDeal)
      dispatch(cancelDeal({ typeOfDeal, dealId }))
    } catch (err) {
      dispatch(setError(err.error ?? 'Ошибка!'))
    } finally {
      dispatch(setLoading(false))
    }
  }

export const {
  setLandlordDealsData,
  setRenterDealsData,
  setError,
  setLoading,
  clearData,
  changeStatus,
  cancelDeal,
} = dealsSlice.actions

export default dealsSlice.reducer
