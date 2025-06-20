import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const subscribeApi = createApi({
  reducerPath: "subscribeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL + "/api",
  }),
  tagTypes: ["Subscribers"],
  endpoints: (builder) => ({
    createSubscribe: builder.mutation({
      query: (subscriberData) => ({
        url: "/subscribe",
        method: "POST",
        body: subscriberData,
      }),
      invalidatesTags: ["Subscribers"],
    }),
  }),
});

export const { useCreateSubscribeMutation } = subscribeApi;
