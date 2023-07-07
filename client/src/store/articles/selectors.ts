import { RootState } from "src/store/store";

export const getSkipArticles = (state: RootState) => state.articlesSlice.skip;
export const getTitle = (state: RootState) => state.articlesSlice.title;
export const getTotalPages = (state: RootState) => state.articlesSlice.pages;
export const getLimit = (state: RootState) => state.articlesSlice.limit;
export const getSelectedArticle = (state: RootState) =>
  state.articlesSlice.selectedArticle;
