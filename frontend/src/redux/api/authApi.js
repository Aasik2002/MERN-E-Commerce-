import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:5000/api/v1', // Backend API base URL
    credentials: 'include' // Required for sending cookies / tokens automatically
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    
    // 1. Register User
    registerUser: builder.mutation({
      query: (userData) => ({
        url: '/register',
        method: 'POST',
        body: userData,
      }),
    }),

    // 2. Login User
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['User'],
    }),

    // 3. Verify Email OTP
    verifyEmail: builder.mutation({
      query: (data) => ({
        url: '/verify-email',
        method: 'POST',
        body: data,
      }),
    }),

    // 4. Forgot Password
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: '/password/forgot',
        method: 'POST',
        body: data,
      }),
    }),

    // 5. Reset Password 
    resetPassword: builder.mutation({
      query: ({ token, passwords }) => ({
        url: `/password/reset/${token}`,
        method: 'POST',
        body: passwords,
      }),
    }),

    // 6. Get User Profile (Current Logged-in User)
    getProfile: builder.query({
      query: () => '/me',
      providesTags: ['User'],
    }),

    // 7. Update User Profile (Name, Avatar, etc.)
    updateProfile: builder.mutation({
      query: (updatedData) => ({
        url: '/me/update',
        method: 'PUT',
        body: updatedData,
      }),
      invalidatesTags: ['User'], // Automatically invalidates user cache to trigger fresh refetching
    }),

    // 8. Logout User
    logoutUser: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'GET',
      }),
      invalidatesTags: ['User'],
    }),

  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useVerifyEmailMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useLogoutUserMutation,
} = authApi;