import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const personApi = createApi({
    reducerPath: 'personApi',
    tagTypes: ['Persons', 'Person'],
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080' }),
    endpoints: (build) => ({
        getPersons: build.query({
            query: () => 'persons',
            providesTags: (result) => result
                ? [...result.map(({ id }) => ({ type: 'Persons', id })), { type: 'Persons', id: 'LIST' },]
                : [{ type: 'Persons', id: 'LIST' }],
        }),
        getCars: build.query({
            query: () => 'cars'
        }),
        getPerson: build.query({
            query: (number) => ({
                url: `person_with_cars?passport=${number}`,
                method: 'GET'
            }),
            providesTags: ['Person']
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
            query(data) {
                const { passport, ...body } = data;
                return {
                    url: `registration_car?passport=${passport}`,
                    method: 'POST',
                    body: body
                }
            },
            invalidatesTags: ['Person']
        }),
        removalCar: build.mutation({
            query: ({ passport, number }) => ({
                url: `removal_car?passport=${passport}&number=${number}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Person']
        })
    })
})

export const {
    useGetPersonsQuery,
    useGetCarsQuery,
    useGetPersonQuery,
    useAddPersonMutation,
    useDeletePersonMutation,
    useRegistrationCarMutation,
    useRemovalCarMutation
} = personApi;