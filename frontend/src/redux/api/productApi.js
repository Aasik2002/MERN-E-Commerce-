import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:5000/api/v1', // உங்களது Backend Port 5000
    credentials: 'include' 
  }),
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    
    getAllProducts: builder.query({
      query: (queryParams = {}) => ({
        url: '/products',
        params: queryParams,
      }),
      providesTags: ['Product'],
    }),

    getProductDetails: builder.query({
      query: (id) => `/product/${id}`,
      providesTags: ['Product'],
    }),

  }),
});

export const { 
  useGetAllProductsQuery, 
  useGetProductDetailsQuery 
} = productApi;