import React, { FC, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
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
import { getAdds, getUserAds, clearData } from '../store/slices/addsSlice'
import ContentWrapper from '../components/ContentWrapper'

const AddsList: FC = () => {
  const { userId } = useParams<{ userId: string }>()
  const dispatch = useDispatch()

  const {
    data: adds,
    isLoading,
    errorMessage,
    success,
  } = useSelector((state: RootState) => state.adds)

  useEffect((): (() => void) => {
    if (userId) {
      dispatch(getUserAds(userId))
    } else {
      dispatch(getAdds())
    }

    return () => dispatch(clearData())
  }, [dispatch, getAdds, getUserAds, clearData, userId])

  return (
    <Container component="main" maxWidth="md">
      <Box mt={3} mb={3}>
        <Typography variant="h2" component="h1" color="primary">
          {userId ? 'Мои объявления' : 'Объявления'}
        </Typography>
      </Box>
      <ContentWrapper
        isLoading={isLoading}
        errorMessage={errorMessage}
        isEmpty={!adds.length && success}
        contentGeneratorCallback={() => adds.map(cardGenerator)}
      />
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
              height="270"
              image={`http://localhost:8080/${mainImage.filename}`}
              alt={add.name}
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
