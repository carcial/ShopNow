import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



export interface ProductsValue {
    id: number;
    image: string;
    price: number;
    title: string;
    description: string
}

export interface fetchValues {
    data: ProductsValue[];
    isLoading: boolean;
    error: boolean;
}

const initialState: fetchValues = {
    data: [],
    isLoading: false,
    error: false
}

export const fetchedData = createAsyncThunk("getProductsData", async () => {
    const response = await fetch("https://fakestoreapi.com/products")
    const result = await response.json()
    return result
})


const fetchDataSlice = createSlice({
    name: "status",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchedData.pending, state => {
                state.isLoading = true;
            })
            .addCase(fetchedData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchedData.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            });
    }
})



export default fetchDataSlice.reducer
