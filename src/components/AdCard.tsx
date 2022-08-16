import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core'
import { Ad } from '../interfaces/ads'

interface Props {
  isLoading: boolean
  errorMessage: string
  isEmpty?: boolean
  contentGeneratorCallback: () => JSX.Element | Array<JSX.Element>
}

const AdCard: FC<{ ad: Ad }> = ({ ad }) => {
  const mainImage = ad.Images.find((image) => image.isMain) ?? ad.Images[0]
  return (
    <NavLink to={`/ad/${ad.id}`} style={{ textDecoration: 'none' }}>
      <Box mt={5}>
        <Card>
          <CardActionArea>
            <CardMedia
              component="img"
              height="270"
              image={`http://localhost:8080/${mainImage.filename}`}
              alt={ad.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {ad.name}
              </Typography>
              <Typography gutterBottom variant="h5" component="div">
                {ad.price} ₽
              </Typography>
              {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
              {/*@ts-ignore*/}
              <Typography variant="body2" color="text.secondary">
                {ad.description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
    </NavLink>
  )
}

export default AdCard
