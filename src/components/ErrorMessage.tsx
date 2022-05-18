import React from 'react'
import { Box, Typography } from '@material-ui/core'

const ErrorMessage = ({ message }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '30vh',
      }}
    >
      <Typography variant="subtitle1" component="p" color="error">
        {message}
      </Typography>
    </Box>
  )
}

export default ErrorMessage
