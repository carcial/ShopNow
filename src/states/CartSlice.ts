import { createSlice } from '@reduxjs/toolkit';
import { ProductsValue } from './FetchDataSlice';


export interface cartProductsTyps {
    cartProduct: ProductsValue[]
}

const initialState: cartProductsTyps = {
    cartProduct: []
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addProduct: (state, action) => {
            state.cartProduct = [...state.cartProduct, action.payload]
        },
        removeProduct: (state, action) => {
            state.cartProduct = state.cartProduct.filter((product) => {
                return product.id !== action.payload.id
            })
        }
    }
})

export default cartSlice.reducer
export const { addProduct, removeProduct } = cartSlice.actions