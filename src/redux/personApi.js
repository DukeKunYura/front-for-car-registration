import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const personApi = createApi({
    reducerPath: 'personApi',
    tagTypes: ['Persons'],
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080' }),
    endpoints: (build) => ({
        getPersons: build.query({
            query: () => 'persons',
            providesTags: (result) => result
                ? [...result.map(({ id }) => ({ type: 'Persons', id })), { type: 'Persons', id: 'LIST' },]
                : [{ type: 'Persons', id: 'LIST' }],
        }),
        addPerson: build.mutation({
            query: (body) => ({
                url: 'person',
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'Persons', id: 'LIST' }]
        }),
        deletePerson: build.mutation({
            query: (number) => ({
                url: `delete_person?passport=${number}`,
                method: 'DELETE'
            }),
            invalidatesTags: [{ type: 'Persons', id: 'LIST' }]
        })
    })
})

export const { useGetPersonsQuery, useAddPersonMutation, useDeletePersonMutation } = personApi;