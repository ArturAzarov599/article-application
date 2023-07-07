import { configureStore } from "@reduxjs/toolkit";

import { articlesReducer } from "src/store/articles/reducer";
import { articlesApi } from "src/store/articles/articles.api";

export const store = configureStore({
  reducer: {
    ...articlesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(articlesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
