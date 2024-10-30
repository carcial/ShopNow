import { createSlice } from "@reduxjs/toolkit";


export type oneProduct = {
    id: number;
    image: string;
    price: number;
    title: string;
    description: string
}

export interface productVariable {
    product: oneProduct;
    showModal: boolean
}

const initialState: productVariable = {
    product: {
        id: 0,
        image: "Undefined",
        price: 0,
        title: "Undefined",
        description: "Unefined"
    },
    showModal: false
}


const productModalSlice = createSlice({
    name: "productModal",
    initialState,
    reducers: {
        show: (state, action) => {
            state.showModal = true
            state.product = action.payload
        },
        closeModal: (state) => {
            state.showModal = false
        }
    }
})

export default productModalSlice.reducer
export const { show, closeModal } = productModalSlice.actions