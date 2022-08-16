import React, { FC } from 'react'
import { Box, Typography } from '@material-ui/core'

const RequestAnswerInfo: FC<{ content: JSX.Element }> = ({ content }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '30vh',
    }}
  >
    <Typography gutterBottom variant="h6" component="p">
      {content}
    </Typography>
  </Box>
)

export default RequestAnswerInfo
