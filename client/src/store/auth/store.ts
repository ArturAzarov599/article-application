import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "./auth.api";

interface IAuthInitialState {
  token: string;
  email: string;
  username: string;
}

const initialState: IAuthInitialState = {
  token: "",
  email: "",
  username: "",
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
  },
  extraReducers: (builder) =>
    builder.addMatcher(
      authApi.endpoints.signIn.matchFulfilled,
      (state, action) => {
        state.token = action.payload.token;
        state.email = action.payload.email;
        state.username = action.payload.username;
      }
    ),
});
