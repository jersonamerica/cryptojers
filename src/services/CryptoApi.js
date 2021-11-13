import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://coinranking1.p.rapidapi.com';

const crytoApiHeaders = {
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': 'c7d64dade5msh3eb04b7204b8105p1a6362jsn8bfbef309718',
};

const createRequest = url => ({ url, headers: crytoApiHeaders });

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: builder => ({
        getCryptos: builder.query({
            query: count => createRequest(`/coins?limit=${count}`),
        }),
    }),
});

export const { useGetCryptosQuery } = cryptoApi;
