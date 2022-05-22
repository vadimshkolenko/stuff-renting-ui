import React from 'react'
import { Box, Button, PropTypes, Typography } from '@material-ui/core'
import Stack from '@mui/material/Stack'
import { dealStatus } from '../static'

interface Button {
  color: PropTypes.Color
  variant: 'text' | 'outlined' | 'contained'
  name: string
  onClick: () => void
}

const ContentGenerator = ({ action }) => (
  <Box mt={3}>
    <Typography variant="body2" color="textSecondary">
      {action.caption}
    </Typography>
    {action.buttons?.length && (
      <Box mt={2}>
        <Stack spacing={2} direction="row">
          <>
            {action.buttons.map((button: Button) => (
              <Button
                key={button.name}
                onClick={button.onClick}
                variant={button.variant}
                color={button.color}
              >
                {button.name}
              </Button>
            ))}
          </>
        </Stack>
      </Box>
    )}
  </Box>
)

const DealActionButtons = ({
  changeDealStatusCallback,
  cancelDealRequestCallback,
  role,
  status,
  generatePaymentLink,
}) => {
  const landLordActions = {
    [dealStatus.WAIT_RESPONSE]: {
      caption: 'Запрос на аренду ожидает вашего действия:',
      buttons: [
        {
          name: 'Подтвердить',
          variant: 'contained',
          color: 'primary',
          onClick: changeDealStatusCallback,
        },
        {
          name: 'Отклонить',
          variant: 'outlined',
          color: 'secondary',
          onClick: cancelDealRequestCallback,
        },
      ],
    },
    [dealStatus.WAIT_PAYMENT]: {
      caption: 'Ожидается оплата арендатором.',
    },
    [dealStatus.WAIT_RECEIVING]: {
      caption: 'Арендатель ожидает получения вещи.',
    },
    [dealStatus.ACTIVE]: {
      caption: 'По окончании аренды подтвердите получение вещи обратно:',
      buttons: [
        {
          name: 'Подтвердить',
          variant: 'contained',
          color: 'primary',
          onClick: changeDealStatusCallback,
        },
      ],
    },
    [dealStatus.COMPLETED]: {
      caption: 'Сделка завершена.',
    },
  }

  const renterActions = {
    [dealStatus.WAIT_RESPONSE]: {
      caption: 'Вы можете отменить запрос на аренду:',
      buttons: [
        {
          name: 'Отменить запрос',
          variant: 'outlined',
          color: 'secondary',
          onClick: cancelDealRequestCallback,
        },
      ],
    },
    [dealStatus.WAIT_PAYMENT]: {
      caption: 'Произведите оплату:',
      buttons: [
        {
          name: 'Оплатить',
          variant: 'contained',
          color: 'primary',
          onClick: generatePaymentLink,
        },
      ],
    },
    [dealStatus.WAIT_RECEIVING]: {
      caption: 'Ожидается подтверждение получения вещи:',
      buttons: [
        {
          name: 'Подтвердить',
          variant: 'contained',
          color: 'primary',
          onClick: changeDealStatusCallback,
        },
      ],
    },
    [dealStatus.ACTIVE]: {
      caption: 'Вещь находится в вашем пользовании.',
    },
    [dealStatus.COMPLETED]: {
      caption: 'Сделка завершена.',
    },
  }

  if (role === 'landlord') {
    return <ContentGenerator action={landLordActions[status]} />
  } else {
    return <ContentGenerator action={renterActions[status]} />
  }
}

export default DealActionButtons
