import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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

export const { useGetRateQuery } = fxApi;
