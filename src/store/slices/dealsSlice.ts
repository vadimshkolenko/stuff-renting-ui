import { createSlice } from '@reduxjs/toolkit'
import {
  changeDealStatusQuery,
  getDealsQuery,
  cancelDealRequestQuery,
} from '../../services'
import { renter } from '../../static'

const initialState = {
  dealsErrorMessage: null,
  dealsLoading: false,
  dealsLoadingSuccess: false,
  renterDeals: [],
  landlordDeals: [],
}

type Deal = 'renterDeals' | 'landlordDeals'

const dealsSlice = createSlice({
  name: 'deals',
  initialState,
  reducers: {
    setRenterDeals: (state, action) => {
      state.renterDeals = action.payload
    },
    setLandlordDeals: (state, action) => {
      state.landlordDeals = action.payload
    },
    setDealsErrorMessage: (state, action) => {
      state.dealsErrorMessage = action.payload
    },
    setDealsLoadingSuccess: (state, action) => {
      state.dealsLoadingSuccess = action.payload
    },
    setDealsLoading: (state, action) => {
      state.dealsLoading = action.payload
    },
    clearData: (state) => {
      state = initialState
      return state
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
  dispatch(setDealsLoading(true))
  try {
    const response = await getDealsQuery(role, userId)
    const { data } = response.data
    if (role === renter) {
      dispatch(setRenterDeals(data))
    } else {
      dispatch(setLandlordDeals(data))
    }
    dispatch(setDealsLoadingSuccess(true))
  } catch (err) {
    dispatch(setDealsErrorMessage(err.error ?? 'Ошибка!'))
  } finally {
    dispatch(setDealsLoading(false))
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
    try {
      await changeDealStatusQuery({
        dealId,
        landlordId,
        newStatus,
      })
      dispatch(changeStatus({ typeOfDeal, dealId, newStatus }))
    } catch (err) {
    } finally {
    }
  }

export const cancelDealRequest =
  ({ typeOfDeal, dealId }) =>
  async (dispatch) => {
    try {
      await cancelDealRequestQuery(dealId, typeOfDeal)
      dispatch(cancelDeal({ typeOfDeal, dealId }))
    } catch (err) {
    } finally {
    }
  }

export const {
  setLandlordDeals,
  setRenterDeals,
  setDealsErrorMessage,
  clearData,
  changeStatus,
  cancelDeal,
  setDealsLoadingSuccess,
  setDealsLoading,
} = dealsSlice.actions

export default dealsSlice.reducer
