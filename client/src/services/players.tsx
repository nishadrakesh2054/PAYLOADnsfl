// src/services/player.ts

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PlayerResponse, PlayerByIdResponse } from "../types/players";

export const playerApi = createApi({
  reducerPath: "playerApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL + "/api", }),
  tagTypes: ["Players"],
  endpoints: (builder) => ({
    getPlayers: builder.query<PlayerResponse, void>({
      query: () => "/players",
      providesTags: ["Players"],
    }),

    getPlayerById: builder.query<PlayerByIdResponse, number>({
      query: (id) => `/players/${id}`,
      providesTags: (result, error, id) => [{ type: "Players", id }],
    }),

    getPlayersByTeamId: builder.query<PlayerResponse, number>({
      query: (teamId) => `/teams/${teamId}/players`,
      providesTags: (result, error, teamId) => [
        { type: "Players", id: teamId },
      ],
    }),

    getPlayerFromTeam: builder.query<
      PlayerByIdResponse,
      { teamId: number; playerId: number }
    >({
      query: ({ teamId, playerId }) => `/teams/${teamId}/players/${playerId}`,
      providesTags: (result, error, { teamId, playerId }) => [
        { type: "Players", id: playerId },
      ],
    }),
  }),
});

export const {
  useGetPlayersQuery,
  useGetPlayerByIdQuery,
  useGetPlayersByTeamIdQuery,
  useGetPlayerFromTeamQuery,
} = playerApi;
