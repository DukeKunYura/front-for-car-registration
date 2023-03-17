import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const personApi = createApi({
    reducerPath: 'personApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080' }),
    endpoints: (build) => ({
        getPersons: build.query({
            query: () => 'persons'
        }),
        addPerson: build.mutation({
            query: (body) => ({
                url: 'person',
                method: 'POST',
                body,
            })
        })
    })
})

export const { useGetPersonsQuery, useAddPersonMutation } = personApi;