import React, { FC, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate, NavLink } from 'react-router-dom'
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
} from '@material-ui/core'
import { RootState } from '../store/configureStore'
import { getAdds } from '../store/slices/addsSlice'

const AddsList: FC = () => {
  const dispatch = useDispatch()

  const adds = useSelector((state: RootState) => state.adds.data)
  console.log('add', adds)

  useEffect(() => {
    dispatch(getAdds())
  }, [dispatch, getAdds])

  return (
    <Container component="main" maxWidth="md">
      <Box mt={3} mb={3}>
        <Typography variant="h2" component="h1" color="primary">
          Объявления
        </Typography>
      </Box>
      {adds.map(cardGenerator)}
    </Container>
  )
}

function cardGenerator(add) {
  const mainImage = add.images.find((image) => image.isMain) ?? add.images[0]
  return (
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
            <Typography variant="body2" color="text.secondary">
              {add.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  )
}

export default AddsList
