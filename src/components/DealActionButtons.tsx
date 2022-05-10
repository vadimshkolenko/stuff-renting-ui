import React from 'react'
import { Box, Button, Typography } from '@material-ui/core'
import Stack from '@mui/material/Stack'

const DealActionButtons = ({
  changeDealStatusCallback,
  cancelDealRequestCallback,
}) => {
  return (
    <Box mt={3}>
      <Typography variant="body2" color="text.secondary">
        Запрос на аренду ожидает вашего действия:
      </Typography>
      <Box mt={2}>
        <Stack spacing={2} direction="row">
          <Button
            onClick={changeDealStatusCallback}
            variant="contained"
            color="primary"
          >
            Подтвердить
          </Button>
          <Button
            onClick={cancelDealRequestCallback}
            variant="outlined"
            color="secondary"
          >
            Отклонить
          </Button>
        </Stack>
      </Box>
    </Box>
  )
}

export default DealActionButtons
