// src/services/table.ts

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TableResponse } from "../types/table";

export const tableApi = createApi({
  reducerPath: "tableApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL + "/api", }),
  tagTypes: ["Table"],
  endpoints: (builder) => ({
    getTables: builder.query<TableResponse, void>({
      query: () => "/tables",
      providesTags: ["Table"],
    }),
  }),
});

export const { useGetTablesQuery } = tableApi;
