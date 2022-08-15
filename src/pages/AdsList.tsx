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
import { getAds, getUserAds, clearData } from '../store/slices/adsSlice'
import ContentWrapper from '../components/ContentWrapper'
import { adsView } from '../static'

const AdsList: FC = ({ mode }: { mode: string }) => {
  const { userId } = useParams<{ userId: string }>()
  const dispatch = useDispatch()

  const {
    data: ads,
    isLoading,
    errorMessage,
    success,
  } = useSelector((state: RootState) => state.ads)

  const titleGenerate = () => {
    switch (mode) {
      case adsView.ALL_ADS:
        return 'Объявления'
      case adsView.USER_ADS:
        return 'Мои объявления'
      case adsView.FAVORITE_ADS:
        return 'Избранное'
    }
  }

  useEffect((): (() => void) => {
    switch (mode) {
      case adsView.ALL_ADS:
        dispatch(getAds())
        break
      case adsView.USER_ADS:
        dispatch(getUserAds(userId))
        break
      case adsView.FAVORITE_ADS:
        dispatch(getUserAds(userId, true))
        break
    }

    return () => dispatch(clearData())
  }, [dispatch, getAds, getUserAds, clearData, userId, mode])

  return (
    <Container component="main" maxWidth="md">
      <Box mt={3} mb={3}>
        <Typography variant="h2" component="h1" color="primary">
          {titleGenerate()}
        </Typography>
      </Box>
      <ContentWrapper
        isLoading={isLoading}
        errorMessage={errorMessage}
        isEmpty={!ads.length && success}
        contentGeneratorCallback={() => ads.map(cardGenerator)}
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

export default AdsList
