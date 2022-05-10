export const statusConverter = (status: string) => {
  switch (status) {
    case 'WAIT_RESPONSE':
      return 'Ожидает подтверждения'
    case 'ACTIVE':
      return 'Активная'
    case 'COMPLETED':
      return 'Завершенная'
    default:
      return ''
  }
}
