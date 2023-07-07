import { articlesSlice } from "src/store/articles/store";
import { articlesApi } from "src/store/articles/articles.api";

export const articlesReducer = {
  [articlesApi.reducerPath]: articlesApi.reducer,
  [articlesSlice.name]: articlesSlice.reducer,
};
