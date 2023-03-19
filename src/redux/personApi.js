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
        getPerson: build.query({
            query: (number) => ({
                url: `person_with_cars?passport=${number}`,
                method: 'GET'
            })
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
        }),
        registrationCar: build.mutation({
            query: (passport, body) => ({
                url: `registration_car?passport=${passport}`,
                method: 'POST',
                body,
            })
        }),
        removalCar: build.mutation({
            query: (passport, number) => ({
                url: `removal_car?passport=${passport}&number=${number}`,
                method: 'DELETE'
            })
        })
    })
})

export const {
    useGetPersonsQuery,
    useGetPersonQuery,
    useAddPersonMutation,
    useDeletePersonMutation,
    useRegistrationCarMutation,
    useRemovalCarMutation
} = personApi;