import { configureStore } from '@reduxjs/toolkit';
import { personApi } from './personApi';
import masterReducer from '../redux/masterSlice';

export const store = configureStore({
    reducer: {
        [personApi.reducerPath]: personApi.reducer,
        master: masterReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(personApi.middleware)
})