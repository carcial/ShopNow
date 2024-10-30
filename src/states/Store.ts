import { configureStore } from '@reduxjs/toolkit'
import FetchDataSlice from './FetchDataSlice'
import ProductModalSlice from './ProductModalSlice'
import SearchModalSlice from './SearchModalSlice'
import CartSlice from './CartSlice'

const store = configureStore({
    reducer: {
        getFetchedData: FetchDataSlice,
        productModal: ProductModalSlice,
        searchModal: SearchModalSlice,
        cart: CartSlice
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
