import React from 'react'
import { Box, Typography } from '@material-ui/core'

const RequestAnswerInfo = ({ content }: { content: JSX.Element }) => (
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
