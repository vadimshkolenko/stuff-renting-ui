import { dealStatus } from '../static'

export const statusConverter = (status: string) => {
  switch (status) {
    case dealStatus.WAIT_RESPONSE:
      return 'Ожидает подтверждения'
    case dealStatus.WAIT_PAYMENT:
      return 'Ожидает оплаты'
    case dealStatus.WAIT_RECEIVING:
      return 'Ожидает подтверждения получение'
    case dealStatus.ACTIVE:
      return 'Активная'
    case dealStatus.COMPLETED:
      return 'Завершенная'
    default:
      return ''
  }
}
