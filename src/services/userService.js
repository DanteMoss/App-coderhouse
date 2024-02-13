import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../firebase/db";

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getUserData: builder.query({
      query: (localId) => `users/${localId}.json`
    }),
    getProfilePicture: builder.query({
      query: (localId) => `profilePictures/${localId}.json` 
    }),
    postUserData: builder.mutation({
      query: ({localId, data}) => ({
        url: `users/${localId}.json`,
        method: 'PUT',
        body: data
      })
    }),
    postProfilePicture: builder.mutation({
      query: ({localId, image}) => ({
        url: `profilePictures/${localId}.json`,
        method: 'PUT',
        body: {
          image
        }
      })
    })
  })
})


export const {
  useGetProfilePictureQuery,
  usePostProfilePictureMutation,
  usePostUserDataMutation,
  useGetUserDataQuery
} = userApi