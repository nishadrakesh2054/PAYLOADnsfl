// src/services/sponser.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SponsorResponse, Sponsor } from "../types/sponser";

export const sponserApi = createApi({ 
  reducerPath: "sponserApi",
  baseQuery: fetchBaseQuery({  baseUrl: `${import.meta.env.VITE_API_BASE_URL}/api`}),
  tagTypes: ["Sponsers"],
  endpoints: (builder) => ({
    getSponsers: builder.query<SponsorResponse, void>({
      query: () => "/sponsors",
      providesTags: ["Sponsers"],
    }),

    getSponserById: builder.query<Sponsor, string>({
      query: (id) => `/sponsors/${id}`,
      providesTags: (result, error, id) => [{ type: "Sponsers", id }],
    })
  })
});

// Hooks
export const { useGetSponsersQuery, useGetSponserByIdQuery } = sponserApi;
