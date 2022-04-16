import React, { FC, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { confirmQuery } from '../services'
import { token as tokenKey, userId } from '../static'
import { setUserData, login } from '../store/slices/accountSlice'
import { RootState } from '../store/configureStore'

const Confirmation: FC = () => {
  const dispatch = useDispatch()
  const [errorMessage, setErrorMessage] = useState(null)

  const { verificationToken } = useParams<{ verificationToken: string }>()

  const token = useSelector((state: RootState) => state.account.token)

  useEffect(() => {
    dispatch(login(() => confirmQuery(verificationToken), setErrorMessage))
  }, [])

  if (token) return <Navigate to={'/'} />
  if (errorMessage) {
    return <p>{errorMessage}</p>
  }

  return <div>Подождите, пожалуйста...</div>
}

export default Confirmation
