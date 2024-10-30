import { createSlice } from "@reduxjs/toolkit"


export interface searchTypes {
    showSearchModal: boolean
}

const initialState: searchTypes = {
    showSearchModal: false,
}

const searchModalSlice = createSlice({
    name: "searchModal",
    initialState,
    reducers: {
        showSearch: (state) => {
            state.showSearchModal = true
        },
        hideSearch: (state) => {
            state.showSearchModal = false
        }
    }
})

export default searchModalSlice.reducer
export const { showSearch, hideSearch } = searchModalSlice.actions