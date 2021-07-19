import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const fxApi = createApi({
  reducerPath: 'fxApi',
  baseQuery: fetchBaseQuery({
    baseUrl:
      'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies',
  }),
  endpoints: (builder) => ({
    getRate: builder.query<
      { [key: string]: number },
      { currencyFrom: string; currencyTo: string }
    >({
      query: ({ currencyFrom, currencyTo }) =>
        `/${currencyFrom}/${currencyTo}.json`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetRateQuery } = fxApi;
