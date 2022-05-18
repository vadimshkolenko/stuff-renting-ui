import React, { FC, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
} from '@material-ui/core'
import { RootState } from '../store/configureStore'
import { getAdds, clearData } from '../store/slices/addsSlice'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'
import EmptyData from '../components/EmptyData'

const AddsList: FC = () => {
  const dispatch = useDispatch()

  const {
    data: adds,
    isLoading,
    errorMessage,
    success,
  } = useSelector((state: RootState) => state.adds)

  useEffect((): (() => void) => {
    dispatch(getAdds())

    return () => dispatch(clearData())
  }, [dispatch, getAdds])

  const renderBody = () => {
    if (isLoading) {
      return <Loader />
    } else if (errorMessage) {
      return <ErrorMessage message={errorMessage} />
    } else if (!adds.length && success) {
      return <EmptyData />
    } else {
      return <>{adds.map(cardGenerator)}</>
    }
  }

  return (
    <Container component="main" maxWidth="md">
      <Box mt={3} mb={3}>
        <Typography variant="h2" component="h1" color="primary">
          Объявления
        </Typography>
      </Box>
      {renderBody()}
    </Container>
  )
}

function cardGenerator(add) {
  const mainImage = add.Images.find((image) => image.isMain) ?? add.Images[0]
  return (
    <NavLink to={`/ad/${add.id}`} style={{ textDecoration: 'none' }}>
      <Box mt={5}>
        <Card>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={`http://localhost:8080/${mainImage.filename}`}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {add.name}
              </Typography>
              <Typography gutterBottom variant="h5" component="div">
                {add.price} ₽
              </Typography>
              {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
              {/*@ts-ignore*/}
              <Typography variant="body2" color="text.secondary">
                {add.description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
    </NavLink>
  )
}

export default AddsList
