import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BlogResponse, BlogByIdResponse } from "../types/blog";

export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}/api`,
  }),
  tagTypes: ["Blogs"],
  endpoints: (builder) => ({
    getBlogs: builder.query<
      BlogResponse,
      { page?: number; limit?: number; category?: string }
    >({
      query: (params) => ({
        url: "/blogs",
        params: {
          page: params.page || 1,
          limit: params.limit || 10,
          ...(params.category && params.category !== "all"
            ? { category: params.category }
            : {}),
        },
      }),
      providesTags: ["Blogs"],
    }),

    getBlogById: builder.query<BlogByIdResponse, string>({
      query: (id) => `/blogs/${id}`,
      providesTags: (result, error, id) => [{ type: "Blogs", id }],
    }),
  }),
});

export const { useGetBlogsQuery, useGetBlogByIdQuery } = blogApi;
