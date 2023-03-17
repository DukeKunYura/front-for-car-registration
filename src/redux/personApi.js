import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const personApi = createApi({
    reducerPath: 'personApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080' }),
    endpoints: (build) => ({
        getPersons: build.query({
            query: () => 'persons'
        })
    })
})

export const { useGetPersonsQuery } = personApi;