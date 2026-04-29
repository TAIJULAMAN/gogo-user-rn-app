import { baseApi } from "./baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyProfile: builder.query({
      query: () => "users/me",
      providesTags: ["user"],
    }),
    updateMyProfile: builder.mutation({
      query: (body) => ({
        url: "users/me",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["user"],
    }),
    getSavedAddresses: builder.query({
      query: () => "users/me/addresses",
      providesTags: ["addresses"],
    }),
    addSavedAddress: builder.mutation({
      query: (body) => ({
        url: "users/me/addresses",
        method: "POST",
        body,
      }),
      invalidatesTags: ["addresses", "user"],
    }),
    updateSavedAddress: builder.mutation({
      query: ({ addressId, body }) => ({
        url: `users/me/addresses/${addressId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["addresses", "user"],
    }),
    deleteSavedAddress: builder.mutation({
      query: (addressId) => ({
        url: `users/me/addresses/${addressId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["addresses", "user"],
    }),
  }),
});

export const {
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
  useGetSavedAddressesQuery,
  useAddSavedAddressMutation,
  useUpdateSavedAddressMutation,
  useDeleteSavedAddressMutation,
} = userApi;

export default userApi;
