import React from 'react'
import { Box } from '@material-ui/core'
import ErrorText from './ErrorText'

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
      <ErrorText text={message} />
    </Box>
  )
}

export default ErrorMessage
