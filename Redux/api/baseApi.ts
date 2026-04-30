import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface RootState {
  auth: {
    token: string | null;
  };
}

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.EXPO_PUBLIC_SERVER_URL,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state?.auth?.token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: ["auth", "user", "addresses", "common", "payments", "orders"],
});
