import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IArticle } from "src/interfaces/article.interface";

import { articlesApi } from "src/store/articles/articles.api";

interface IArticlesSliceState {
  skip: number;
  limit: number;
  title: string;
  pages: number;
  selectedArticle: IArticle | null;
  error: any;
}

const initialState: IArticlesSliceState = {
  limit: 15,
  skip: 0,
  pages: 0,
  title: "",
  selectedArticle: null,
  error: null,
};

export const articlesSlice = createSlice({
  name: "articlesSlice",
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    switchPage: (state, action: PayloadAction<number>) => {
      state.skip = action.payload;
    },
    selectArticle: (state, action: PayloadAction<IArticle | null>) => {
      state.selectedArticle = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder.addMatcher(
      articlesApi.endpoints.getArticles.matchFulfilled,
      (state, action) => {
        state.pages = Math.ceil(action.payload.total / state.limit);
      }
    ),
});
