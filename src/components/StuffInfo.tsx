import React, { FC } from 'react'
import { Box, Grid, Typography, CardMedia } from '@material-ui/core'
import { AddData } from '../store/slices/adDetailSlice'

const StuffInfo: FC = ({ data }: { data: AddData }) => {
  return (
    <Grid item xs={8}>
      <CardMedia
        component="img"
        height="500"
        image={`http://localhost:8080/${data.Images?.[0]?.filename}`}
        alt="stuff"
      />
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: 'white',
          padding: '20px',
          borderRadius: 8,
        }}
        mt={2}
      >
        <Typography gutterBottom variant="h5" component="h3">
          Информация о вещи
        </Typography>
        <Typography gutterBottom variant="body1" component="p">
          {data.description}
        </Typography>
      </Box>
    </Grid>
  )
}

export default StuffInfo
