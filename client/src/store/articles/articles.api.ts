import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import type { RootState } from 'src/store/store'
import { IArticle } from 'src/interfaces/article.interface'
import { IGetArticles } from 'src/interfaces/get-articles.interface'

export const articlesApi = createApi({
  reducerPath: 'articlesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/articles',
    prepareHeaders(headers, { getState }) {
      const state = getState() as RootState
      const token = state.authSlice.token
      headers.set('Authorization', `Bearer ${token}`)
      return headers
    },
  }),
  tagTypes: ['ARTICLES'],
  endpoints: (builder) => ({
    getArticles: builder.query<
      { articles: IArticle[]; total: number },
      IGetArticles
    >({
      query: ({ limit, skip, title }) => ({
        url: `?title=${title}&skip=${skip}&limit=${limit}`,
        method: 'GET',
      }),
      providesTags: ['ARTICLES'],
    }),
    createArticle: builder.mutation<IArticle, Omit<IArticle, 'id'>>({
      query: (article) => ({
        url: '',
        method: 'POST',
        body: article,
      }),
      invalidatesTags: ['ARTICLES'],
    }),
    updateArticle: builder.mutation<IArticle, IArticle>({
      query: (article) => ({
        url: '',
        method: 'PUT',
        body: article,
      }),
      invalidatesTags: ['ARTICLES'],
    }),
    deleteArticle: builder.mutation<IArticle, string>({
      query: (articleId) => ({
        url: `/${articleId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['ARTICLES'],
    }),
  }),
})

export const {
  useGetArticlesQuery,
  useCreateArticleMutation,
  useUpdateArticleMutation,
  useDeleteArticleMutation,
} = articlesApi
