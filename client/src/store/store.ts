import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  PersistConfig,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { authReducer } from 'src/store/auth/reducer'
import { articlesReducer } from 'src/store/articles/reducer'

import { authApi } from 'src/store/auth/auth.api'
import { articlesApi } from 'src/store/articles/articles.api'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const persistConfig: PersistConfig<any> = {
  key: 'root',
  storage,
  whitelist: ['authSlice'],
}

const rootReducer = combineReducers({
  ...articlesReducer,
  ...authReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(articlesApi.middleware)
      .concat(authApi.middleware),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
