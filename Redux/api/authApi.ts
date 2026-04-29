import { baseApi } from "./baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (data) => {
        // console.log("Data being sent to the API:", data);
        return {
          url: "auth/register",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["auth"],
    }),
    logIn: builder.mutation({
      query: (data) => {
        console.log("Data being sent to the API:", data);
        return {
          url: "auth/login",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["auth"],
    }),
    verifyUserPhone: builder.mutation({
      query: (data) => {
        console.log("Data being sent to the API:", data);
        return {
          url: "auth/verify-otp",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["auth"],
    }),
    checkUserByPhone: builder.mutation({
      query: (data) => {
        console.log("Data being sent to the API:", data);
        return {
          url: "auth/check-user",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["auth"],
    }),
  }),
});

export const {
  useSignUpMutation,
  useLogInMutation,
  useVerifyUserPhoneMutation,
  useCheckUserByPhoneMutation,
} = authApi;

export default authApi;
