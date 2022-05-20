import { createSlice } from '@reduxjs/toolkit'
import {
  changeDealStatusQuery,
  getDealsQuery,
  cancelDealRequestQuery,
} from '../../services'
import { renter } from '../../static'
import { Deal, Role } from '../../interfaces/deals'

interface State {
  dealsErrorMessage: string | null
  dealsLoading: boolean
  dealsLoadingSuccess: boolean
  landlordDeals: Array<Deal>
  renterDeals: Array<Deal>
}

const initialState = {
  dealsErrorMessage: null,
  dealsLoading: false,
  dealsLoadingSuccess: false,
  renterDeals: [],
  landlordDeals: [],
}

const dealsSlice = createSlice({
  name: 'deals',
  initialState,
  reducers: {
    setRenterDeals: (state: State, action: { payload: Array<Deal> }) => {
      state.renterDeals = action.payload
    },
    setLandlordDeals: (state: State, action: { payload: Array<Deal> }) => {
      state.landlordDeals = action.payload
    },
    setDealsErrorMessage: (state: State, action: { payload: string }) => {
      state.dealsErrorMessage = action.payload
    },
    setDealsLoadingSuccess: (state: State, action: { payload: boolean }) => {
      state.dealsLoadingSuccess = action.payload
    },
    setDealsLoading: (state: State, action: { payload: boolean }) => {
      state.dealsLoading = action.payload
    },
    clearData: (state: State) => {
      state = initialState
      return state
    },
    changeStatus: (
      state: State,
      action: {
        payload: {
          role: Role
          dealId: number
          newStatus: string
        }
      }
    ) => {
      const { role, dealId, newStatus } = action.payload
      const typeOfDeal = `${role}Deals`
      state[typeOfDeal] = state[typeOfDeal].map((deal) =>
        deal.id === dealId ? { ...deal, status: newStatus } : deal
      )
    },
    cancelDeal: (
      state: State,
      action: {
        payload: { role: Role; dealId: number }
      }
    ) => {
      const { role, dealId } = action.payload
      const typeOfDeal = `${role}Deals`
      state[typeOfDeal] = state[typeOfDeal].filter((deal) => deal.id !== dealId)
    },
  },
})

export const getDeals = (role: Role) => async (dispatch, getState) => {
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
  role: Role
  dealId: number
  landlordId: number
  newStatus: string
}

export const changeDealStatus =
  ({ role, dealId, landlordId, newStatus }: ChangeStatusData) =>
  async (dispatch) => {
    try {
      await changeDealStatusQuery({
        dealId,
        landlordId,
        newStatus,
      })
      dispatch(changeStatus({ role, dealId, newStatus }))
    } catch (err) {
    } finally {
    }
  }

export const cancelDealRequest =
  ({ role, dealId }: { role: Role; dealId: number }) =>
  async (dispatch) => {
    try {
      await cancelDealRequestQuery(dealId, role)
      dispatch(cancelDeal({ dealId, role }))
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
