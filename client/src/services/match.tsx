// src/services/match.ts

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MatchByIdResponse, MatchResponse, MatchDetails } from "../types/match";

export const matchApi = createApi({
  reducerPath: "matchApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL + "/api",
    prepareHeaders: (headers) => {
      console.log("API Request Headers:", headers);
      return headers;
    },
  }),
  tagTypes: ["Match"],
  endpoints: (builder) => ({
    getMatches: builder.query<MatchResponse, void>({
      query: () => {
        console.log("Fetching all matches");
        return "/matches";
      },
      providesTags: ["Match"],
    }),
    getMatchById: builder.query<MatchDetails, string>({
      query: (id) => {
        console.log("Fetching match with ID:", id);
        return `/matches/${id}`;
      },
      providesTags: (result, error, id) => {
        console.log("Match fetch result:", { result, error, id });
        return [{ type: "Match", id }];
      },
    }),
  }),
});

export const { useGetMatchesQuery, useGetMatchByIdQuery } = matchApi;
