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
import { getAdds } from '../store/slices/addsSlice'

const AddsList: FC = () => {
  const dispatch = useDispatch()

  const adds = useSelector((state: RootState) => state.adds.data)

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
