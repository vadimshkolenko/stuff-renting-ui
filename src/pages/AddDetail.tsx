import React, { FC, useState, useEffect } from 'react'
import useInput from '../hooks/useInput'
import { useDispatch, useSelector } from 'react-redux'
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Chip,
} from '@material-ui/core'
import Stack from '@mui/material/Stack'
import { RootState } from '../store/configureStore'
import { NavLink, useParams } from 'react-router-dom'
import { getAd, clearData } from '../store/slices/adDetailSlice'
import moment from 'moment'
import { requestDealQuery } from '../services'
import StuffInfo from '../components/StuffInfo'
import ContentWrapper from '../components/ContentWrapper'
import ErrorText from '../components/ErrorText'
import RequestAnswerInfo from '../components/RequestAnswerInfo'

const AdDetail: FC = () => {
  const dispatch = useDispatch()
  const { adId } = useParams<{ adId: string }>()
  const { UserId } = useSelector((state: RootState) => state.account)
  const { isLoading, errorMessage, data } = useSelector(
    (state: RootState) => state.adDetail
  )
  const dateStart = useInput(moment().format('YYYY-MM-DD'))
  const dateEnd = useInput(moment().add(1, 'days').format('YYYY-MM-DD'))
  const [bookingIsSending, setBookingSending] = useState(false)
  const [bookingError, setBookingError] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState(false)
  const [computedPrice, setComputedPrice] = useState(0)

  useEffect(() => {
    const daysDifference = moment(dateEnd.value).diff(
      moment(dateStart.value),
      'days'
    )
    //иначе ошибку о некорректных датах
    if (daysDifference > 0) {
      setComputedPrice(daysDifference * data.price)
    }
  }, [dateStart, dateEnd])

  useEffect((): (() => void) => {
    dispatch(getAd(adId))

    return () => dispatch(clearData())
  }, [adId, getAd])

  const createDealCallback = async (data) => {
    setBookingSending(true)
    try {
      await requestDealQuery(data)
      setBookingSuccess(true)
    } catch (err) {
      const error =
        err?.response?.data?.errors?.email ||
        err?.response?.data?.errors?.username ||
        'Ошибка!'
      setBookingError(error)
    } finally {
      setBookingSending(false)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    createDealCallback({
      dateStart: dateStart.value,
      dateEnd: dateEnd.value,
      AddId: adId,
      renterId: UserId,
      price: computedPrice,
      deposit: data.deposit,
      landlordId: data.UserId,
      name: data.name,
    })
  }

  if (bookingSuccess) {
    return (
      <RequestAnswerInfo
        content={
          <>
            Ваш запрос на бронирование был успешно отправлен арендодателю!
            <br /> Вы можете посмотреть свои запросы на аренду в разделе{' '}
            <NavLink to={'/deals'}>Мои сделки</NavLink>.
          </>
        }
      />
    )
  }

  return (
    <Container component="main" maxWidth="lg">
      <ContentWrapper
        isLoading={isLoading}
        errorMessage={errorMessage}
        isEmpty={!Object.keys(data).length && !isLoading && !errorMessage}
        contentGeneratorCallback={() => (
          <Box sx={{ flexGrow: 1 }} mt={10}>
            <Grid container spacing={2}>
              <StuffInfo data={data} />
              <Grid item xs={4}>
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  sx={{
                    flexGrow: 1,
                    bgcolor: 'white',
                    padding: '20px',
                    borderRadius: 8,
                  }}
                >
                  <Typography gutterBottom variant="h5" component="h1">
                    {data.name}
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="p"
                    style={{ fontWeight: 600 }}
                  >
                    {data.price}₽/сутки
                  </Typography>
                  <Box mt={2}>
                    <Stack direction="row" spacing={1}>
                      <Chip
                        color="success"
                        label={
                          data.deposit ? `Залог ${data.deposit}₽` : 'Без залога'
                        }
                      />
                      <Chip
                        color="success"
                        label={`Оценочная стоимость ${data.assessedValue}₽`}
                      />
                    </Stack>
                  </Box>
                  {/*TODO FIX TYPES*/}
                  {+data.UserId !== +UserId && (
                    <>
                      <Box mt={3}>
                        <Typography gutterBottom variant="h6" component="p">
                          Дата аренды
                        </Typography>
                        <Stack spacing={1} direction="row">
                          <TextField
                            id="dateStart"
                            label="Начало аренды"
                            type="date"
                            value={dateStart.value}
                            onChange={dateStart.onChange}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                          <TextField
                            id="dateEnd"
                            label="Конец аренды"
                            type="date"
                            value={dateEnd.value}
                            onChange={dateEnd.onChange}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Stack>
                      </Box>
                      <Box mt={2}>
                        <Typography gutterBottom variant="h6" component="p">
                          Итого: {computedPrice}₽
                        </Typography>
                      </Box>
                      <Box mt={2}>
                        <Button
                          variant="contained"
                          color="primary"
                          disabled={bookingIsSending}
                          type="submit"
                        >
                          Забронировать
                        </Button>
                        {bookingError && (
                          <Box mt={2}>
                            <ErrorText text={bookingError} />
                          </Box>
                        )}
                      </Box>
                    </>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Box>
        )}
      />
    </Container>
  )
}

export default AdDetail
