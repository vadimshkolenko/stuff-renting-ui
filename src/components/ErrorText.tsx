import React, { FC } from 'react'
import { Typography } from '@material-ui/core'

const ErrorText: FC<{ text: string }> = ({ text }) => (
  <Typography variant="subtitle1" component="p" color="error">
    {text}
  </Typography>
)

export default ErrorText
