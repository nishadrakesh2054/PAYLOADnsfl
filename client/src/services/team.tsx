import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TeamResponse,Team } from "../types/team";

export const teamApi = createApi({
  reducerPath: "teamApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL + "/api",
  }),
  tagTypes: ["Teams"],
  endpoints: (builder) => ({
    getTeams: builder.query<TeamResponse, void>({
      query: () => "/teams",
      providesTags: ["Teams"],
    }),

    getTeamById: builder.query<Team, string>({
      query: (id) => `/teams/${id}`,
    }),
  }),
});

export const { useGetTeamsQuery, useGetTeamByIdQuery } = teamApi;
