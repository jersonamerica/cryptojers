import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://bing-news-search1.p.rapidapi.com';

const cryptoNewsHeaders = {
    'x-bingapis-sdk': 'true',
    'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
    'x-rapidapi-key': 'c7d64dade5msh3eb04b7204b8105p1a6362jsn8bfbef309718',
};

const createRequest = url => ({ url, headers: cryptoNewsHeaders });

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: builder => ({
        getCryptoNews: builder.query({
            query: ({ newsCategory, count }) =>
                createRequest(
                    `/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`,
                ),
        }),
    }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
