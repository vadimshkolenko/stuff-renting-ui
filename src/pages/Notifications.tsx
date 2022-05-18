import React, { FC, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import {
  Box,
  Card,
  CardContent,
  Container,
  Typography,
} from '@material-ui/core'
import { RootState } from '../store/configureStore'
import { getNotifications, clearData } from '../store/slices/notificationsSlice'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'
import EmptyData from '../components/EmptyData'

const Notifications: FC = () => {
  const dispatch = useDispatch()
  const { UserId } = useSelector((state: RootState) => state.account)

  const {
    data: notifications,
    isLoading,
    errorMessage,
    success,
  } = useSelector((state: RootState) => state.notifications)

  useEffect((): (() => void) => {
    dispatch(getNotifications(UserId))

    return () => dispatch(clearData())
  }, [dispatch, getNotifications])

  const renderBody = () => {
    if (isLoading) {
      return <Loader />
    } else if (errorMessage) {
      return <ErrorMessage message={errorMessage} />
    } else if (!notifications.length && success) {
      return <EmptyData />
    } else {
      return (
        <>
          {notifications.map((notification) => (
            <Box mt={5} key={notification.id}>
              <Card>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {notification.text}
                  </Typography>
                  {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                  {/*@ts-ignore*/}
                  <Typography variant="body2" color="text.secondary">
                    {moment(notification.createdAt).format(
                      'HH:mm MMMM d, YYYY'
                    )}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </>
      )
    }
  }

  return (
    <Container component="main" maxWidth="md">
      <Box mt={3} mb={3}>
        <Typography variant="h2" component="h1" color="primary">
          Уведомления
        </Typography>
      </Box>
      {renderBody()}
    </Container>
  )
}

export default Notifications
