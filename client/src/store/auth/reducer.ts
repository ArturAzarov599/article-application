import { authSlice } from 'src/store/auth/store'
import { authApi } from 'src/store/auth/auth.api'

export const authReducer = {
  [authSlice.name]: authSlice.reducer,
  [authApi.reducerPath]: authApi.reducer,
}
