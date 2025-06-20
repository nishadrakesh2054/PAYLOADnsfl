import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

export const contactApi = createApi({
  reducerPath: "contactApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL + "/api",
  }),
  tagTypes: ["Contacts"],
  endpoints: (builder) => ({
    createContact: builder.mutation({
      query: (contactData) => ({
        url: "/contacts",
        method: "POST",
        body: contactData,
      }),
      invalidatesTags: ["Contacts"],
    }),
  }),
});

export const { useCreateContactMutation } = contactApi;
