import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const personApi = createApi({
    reducerPath: 'personApi',
    tagTypes: ['Persons', 'Person', 'Cars'],
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080' }),
    endpoints: (build) => ({
        getPersons: build.query({
            query: () => 'persons',
            providesTags: (result) => result
                ? [...result.map(({ id }) => ({ type: 'Persons', id })), { type: 'Persons', id: 'LIST' },]
                : [{ type: 'Persons', id: 'LIST' }],
        }),
        getCars: build.query({
            query: () => 'cars',
            providesTags: ['Cars']
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
        updatePerson: build.mutation({
            query(data) {
                const { passport, ...body } = data;
                return {
                    url: `person?passport=${passport}`,
                    method: 'PUT',
                    body: body
                }
            },
            invalidatesTags: [{ type: 'Persons', id: 'LIST' }, 'Person']
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
            invalidatesTags: ['Person', 'Cars']
        }),
        removalCar: build.mutation({
            query: ({ passport, number }) => ({
                url: `removal_car?passport=${passport}&number=${number}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Person', 'Cars']
        }),
        updateCar: build.mutation({
            query(data) {
                const { number, ...body } = data;
                return {
                    url: `car?number=${number}`,
                    method: 'PUT',
                    body: body
                }
            },
            invalidatesTags: ['Person', 'Cars']
        }),
    })
})

export const {
    useGetPersonsQuery,
    useGetCarsQuery,
    useGetPersonQuery,
    useAddPersonMutation,
    useDeletePersonMutation,
    useRegistrationCarMutation,
    useRemovalCarMutation,
    useUpdatePersonMutation,
    useUpdateCarMutation
} = personApi;