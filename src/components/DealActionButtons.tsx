import React from 'react'
import { Box, Button, Typography } from '@material-ui/core'
import Stack from '@mui/material/Stack'

const DealActionButtons = ({
  changeDealStatusCallback,
  cancelDealRequestCallback,
  role,
}) => {
  if (role === 'landlord') {
    return (
      <Box mt={3}>
        <Typography variant="body2" color="textSecondary">
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
  } else {
    return (
      <Box mt={3}>
        <Typography variant="body2" color="textSecondary">
          Вы можете отменить запрос на аренду:
        </Typography>
        <Box mt={2}>
          <Button
            onClick={cancelDealRequestCallback}
            variant="outlined"
            color="secondary"
          >
            Отменить запрос
          </Button>
        </Box>
      </Box>
    )
  }
}

export default DealActionButtons
