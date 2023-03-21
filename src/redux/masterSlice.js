import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    search: "",
    activeLink: "home",
    isActiveCarAdder: false
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
        setIsActiveCarAdder: (state, action) => {
            console.log("hey");
            state.isActiveCarAdder = action.payload
        }

    }
})


export const { setSearch, setActiveLink, setIsActiveCarAdder } = masterSlice.actions

export default masterSlice.reducer