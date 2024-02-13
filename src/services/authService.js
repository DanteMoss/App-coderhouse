import { 
  createApi, 
  fetchBaseQuery 
} from "@reduxjs/toolkit/query/react";
import { 
  API_KEY, 
  BASE_AUTH_URL 
} from "../firebase/db";


export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({baseUrl: BASE_AUTH_URL}),
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: ({...userData}) => ({
        url: `accounts:signUp?key=${API_KEY}`,
        method: 'POST',
        body: userData
      })
    }),
    login: builder.mutation({
      query: ({ ...userData }) => ({
        url: `accounts:signInWithPassword?key=${API_KEY}`,
        method: 'POST',
        body: userData
      })
    })
  })
})


export const { 
  useLoginMutation, 
  useSignUpMutation 
} = authApi