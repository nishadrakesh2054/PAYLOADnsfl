import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HighlightResponse, HighlightByIdResponse } from "../types/highlights";

export const highlightApi = createApi({
  reducerPath: "highlightApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL + "/api",  }),
  tagTypes: ["Highlights"],
  endpoints: (builder) => ({
    getHighlights: builder.query<HighlightResponse, void>({
      query: () => "/highlights",
      providesTags: ["Highlights"],
    }),

    getHighlightById: builder.query<HighlightByIdResponse, number>({
      query: (id) => `/highlights/${id}`,
      providesTags: (result, error, id) => [{ type: "Highlights", id }],
    }),
  }),
});

export const { useGetHighlightsQuery, useGetHighlightByIdQuery } = highlightApi;
