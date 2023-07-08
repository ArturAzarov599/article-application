import { configureStore } from "@reduxjs/toolkit";

import { authReducer } from "src/store/auth/reducer";
import { articlesReducer } from "src/store/articles/reducer";

import { authApi } from "src/store/auth/auth.api";
import { articlesApi } from "src/store/articles/articles.api";

export const store = configureStore({
  reducer: {
    ...articlesReducer,
    ...authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(articlesApi.middleware)
      .concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
