import React from 'react'
import { Box, Typography } from '@material-ui/core'

// TODO customize for every case
const EmptyData = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '30vh',
      }}
    >
      <Typography variant="subtitle1" component="p" color="textPrimary">
        Данные отсутствуют
      </Typography>
    </Box>
  )
}

export default EmptyData
