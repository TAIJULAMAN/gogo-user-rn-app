import { baseApi } from "./baseApi";

export const commonApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCommonContent: builder.query({
      query: () => "common",
      providesTags: ["common"],
    }),
  }),
});

export const { useGetCommonContentQuery } = commonApi;

export default commonApi;
