import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

import { IAuth } from 'src/interfaces/auth.interface'
import { IExtendedAuth } from 'src/interfaces/extended-auth'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/auth',
  }),
  endpoints: (builder) => ({
    signIn: builder.mutation<
      {
        email: string;
        username: string;
        token: string;
      },
      IAuth
    >({
      query: (body) => ({
        url: '/sign-in',
        body,
        method: 'POST',
      }),
    }),
    signUp: builder.mutation<string, IExtendedAuth>({
      query: (body) => ({
        url: '/sign-up',
        body,
        method: 'POST',
      }),
    }),
    deleteUser: builder.mutation<{ email: string }, boolean>({
      query: (body) => ({
        url: '/',
        body,
        method: 'DELETE',
      }),
    }),
  }),
})

export const { useSignInMutation, useSignUpMutation, useDeleteUserMutation } =
  authApi
