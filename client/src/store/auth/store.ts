import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "./auth.api";
import { IError } from "src/interfaces/error.interface";

interface IAuthInitialState {
  token: string;
  email: string;
  username: string;
  errorMessage: string;
}

const initialState: IAuthInitialState = {
  token: "",
  email: "",
  username: "",
  errorMessage: "",
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    signOut: (state) => {
      state.token = "";
      state.email = "";
      state.username = "";
    },
    resetErrorMessage: (state) => {
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) =>
    builder
      .addMatcher(authApi.endpoints.signIn.matchFulfilled, (state, action) => {
        state.token = action.payload.token;
        state.email = action.payload.email;
        state.username = action.payload.username;
      })
      .addMatcher(authApi.endpoints.signIn.matchRejected, (state, action) => {
        state.errorMessage = (action.payload?.data as IError).message || "";
      })
      .addMatcher(authApi.endpoints.signUp.matchRejected, (state, action) => {
        state.errorMessage = (action.payload?.data as IError).message || "";
      }),
});
