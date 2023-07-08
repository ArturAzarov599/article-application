import { RootState } from "src/store/store";

export const getEmail = (state: RootState) => state.authSlice.email;
export const getUsername = (state: RootState) => state.authSlice.username;
export const getToken = (state: RootState) => state.authSlice.token;
