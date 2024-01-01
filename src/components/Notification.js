import { notifications } from '@mantine/notifications'

const NOTIFICATION_TYPE = {
  success: 'green',
  error: 'red',
}

export const Notification = ({ type, title, message }) => {
  notifications.show({
    color: NOTIFICATION_TYPE[type],
    title: title,
    message: message,
  })
}
