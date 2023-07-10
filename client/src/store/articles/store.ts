import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { articlesApi } from "src/store/articles/articles.api";

import { IArticle } from "src/interfaces/article.interface";
import { IError } from "src/interfaces/error.interface";

interface IArticlesSliceState {
  skip: number;
  limit: number;
  title: string;
  pages: number;
  selectedArticle: IArticle | null;
  errorMessage: string;
  successMessage: string;
}

const initialState: IArticlesSliceState = {
  limit: 15,
  skip: 0,
  pages: 0,
  title: "",
  selectedArticle: null,
  errorMessage: "",
  successMessage: "",
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
    clearMessages: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) =>
    builder
      .addMatcher(
        articlesApi.endpoints.getArticles.matchFulfilled,
        (state, action) => {
          state.pages = Math.ceil(action.payload.total / state.limit);
        }
      )
      .addMatcher(
        articlesApi.endpoints.createArticle.matchFulfilled,
        (state) => {
          state.successMessage = "Article successfully created";
        }
      )
      .addMatcher(
        articlesApi.endpoints.updateArticle.matchFulfilled,
        (state) => {
          state.successMessage = "Article successfully updated";
        }
      )
      .addMatcher(
        articlesApi.endpoints.createArticle.matchRejected,
        (state, action) => {
          state.errorMessage = (action.payload?.data as IError).message || "";
        }
      )
      .addMatcher(
        articlesApi.endpoints.updateArticle.matchRejected,
        (state, action) => {
          state.errorMessage = (action.payload?.data as IError).message || "";
        }
      )
      .addMatcher(
        articlesApi.endpoints.deleteArticle.matchRejected,
        (state, action) => {
          state.errorMessage = (action.payload?.data as IError).message || "";
        }
      )
      .addMatcher(
        articlesApi.endpoints.deleteArticle.matchFulfilled,
        (state) => {
          state.successMessage = "Article successfully deleted!";
        }
      ),
});
