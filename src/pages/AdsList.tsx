import React, { FC, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Box, Container, Typography } from '@material-ui/core'
import { RootState } from '../store/configureStore'
import { getAds, getUserAds, clearData } from '../store/slices/adsSlice'
import ContentWrapper from '../components/ContentWrapper'
import AdCard from '../components/AdCard'
import { adsView } from '../static'

const AdsList: FC<{ mode: adsView }> = ({ mode }) => {
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
        contentGeneratorCallback={() =>
          ads.map((ad) => <AdCard key={ad.id} ad={ad} />)
        }
      />
    </Container>
  )
}

export default AdsList
