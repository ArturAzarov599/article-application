import { useDispatch } from 'react-redux'
import { bindActionCreators } from '@reduxjs/toolkit'

import { authSlice } from 'src/store/auth/store'

export const useAuthActions = () => {
  const dispatch = useDispatch()
  return bindActionCreators(authSlice.actions, dispatch)
}
