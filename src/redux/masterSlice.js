import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    search: "",
    activeLink: "home"
};

export const masterSlice = createSlice({
    name: 'master',
    initialState,
    reducers: {

        setSearch: (state, action) => {
            state.search = action.payload
        },
        setActiveLink: (state, action) => {
            state.activeLink = action.payload
        },

    }
})


export const { setSearch, setActiveLink } = masterSlice.actions

export default masterSlice.reducer