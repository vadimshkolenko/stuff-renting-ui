import React, { FC, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import RequestAnswerInfo from '../components/RequestAnswerInfo'
import { createBillQuery } from '../services'

const SuccessPayment: FC = () => {
  const { search } = useLocation()
  const params = new URLSearchParams(search)
  const dealId = params.get('dealId')
  const billId = params.get('billId')

  useEffect(() => {
    createBillQuery({ dealId, billId })
  }, [])

  return (
    <RequestAnswerInfo
      content={
        <>
          Оплата прошла успешно! Вернуться в{' '}
          <NavLink to={'/deals'}>Мои сделки</NavLink>.
        </>
      }
    />
  )
}

export default SuccessPayment
