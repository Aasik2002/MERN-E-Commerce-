import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  // Configure the base URL for all authentication API requests
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:8000/api/v1', 
    credentials: 'include' // Ensures cookies/tokens are sent with requests
  }),
  tagTypes: ['User'], // Used for automated caching and refetching
  endpoints: (builder) => ({
    
    // 1. Register a new user
    registerUser: builder.mutation({
      query: (userData) => ({
        url: '/register',
        method: 'POST',
        body: userData,
      }),
    }),

    // 2. Verify user email using OTP
    verifyEmail: builder.mutation({
      query: (otpData) => ({
        url: '/verify-email',
        method: 'POST',
        body: otpData,
      }),
    }),

    // 3. Authenticate and login user
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
      // Invalidate cache to fetch fresh user data upon successful login
      invalidatesTags: ['User'], 
    }),

    // 🌟 4. Initiate forgot password recovery process (NEWLY ADDED)
    forgotPassword: builder.mutation({
      query: (emailData) => ({
        url: '/password/forgot',
        method: 'POST',
        body: emailData, // Sends { email: "user@example.com" } to the backend
      }),
    }),

    // 5. Fetch current authenticated user's profile
    getProfile: builder.query({
      query: () => '/me',
      providesTags: ['User'], // Provide cache tag for user data
    }),

    // 6. Logout the current user and clear session
    logoutUser: builder.query({
      query: () => '/logout',
    }),
  }),
});

// Export all auto-generated React hooks for components to use
export const { 
  useRegisterUserMutation, 
  useVerifyEmailMutation, 
  useLoginUserMutation, 
  useForgotPasswordMutation, // 🌟 Exporting the newly added hook
  useGetProfileQuery,
  useLazyLogoutUserQuery 
} = authApi;