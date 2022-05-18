import React from 'react'
import { Box } from '@material-ui/core'
import CircularProgress from '@mui/material/CircularProgress'

const Loader = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '70vh',
      }}
    >
      <CircularProgress />
    </Box>
  )
}

export default Loader
