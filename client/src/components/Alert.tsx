import { FC } from 'react'

import AlertComponent, { AlertColor } from '@mui/material/Alert/Alert'
import Snackbar from '@mui/material/Snackbar/Snackbar'

interface IAlertProps {
  message: string
  open: boolean
  onCloseHandler: () => void
  type: AlertColor
}

const Alert: FC<IAlertProps> = ({ message, onCloseHandler, open, type }) => (
  <Snackbar
    open={open}
    anchorOrigin={{
      horizontal: 'right',
      vertical: 'top',
    }}
    autoHideDuration={3000}
    onClose={onCloseHandler}
  >
    <AlertComponent severity={type}>{message}</AlertComponent>
  </Snackbar>
)

export default Alert
