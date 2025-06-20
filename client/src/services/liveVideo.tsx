// src/services/liveVideo.ts

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LiveVideoResponse } from "../types/liveVideo";

export const liveVideoApi = createApi({
  reducerPath: "liveVideoApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL + "/api",  }),
  tagTypes: ["LiveVideo"],
  endpoints: (builder) => ({
    getLiveVideos: builder.query<LiveVideoResponse, void>({
      query: () => "/watchlive",
      providesTags: ["LiveVideo"],
    }),
  }),
});

export const { useGetLiveVideosQuery } = liveVideoApi;
