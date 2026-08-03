import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:8000/api/v1', 
    credentials: 'include' 
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    // Register User
    registerUser: builder.mutation({
      query: (userData) => ({
        url: '/register',
        method: 'POST',
        body: userData,
      }),
    }),

    // Verify Email OTP
    verifyEmail: builder.mutation({
      query: (otpData) => ({
        url: '/verify-email',
        method: 'POST',
        body: otpData,
      }),
    }),

    // Login User
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['User'],
    }),

    // Get Current User Profile
    getProfile: builder.query({
      query: () => '/me',
      providesTags: ['User'],
    }),

    // Logout User
    logoutUser: builder.query({
      query: () => '/logout',
    }),
  }),
});

export const { 
  useRegisterUserMutation, 
  useVerifyEmailMutation, 
  useLoginUserMutation, 
  useGetProfileQuery,
  useLazyLogoutUserQuery 
} = authApi;