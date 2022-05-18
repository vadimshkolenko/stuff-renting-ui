import React from 'react'
import { Box, Typography } from '@material-ui/core'

const ErrorText = ({ text }) => (
  <Typography variant="subtitle1" component="p" color="error">
    {text}
  </Typography>
)

export default ErrorText
