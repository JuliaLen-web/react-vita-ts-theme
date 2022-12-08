import { createSlice } from "@reduxjs/toolkit";
import { ProductState } from "../types/product";
import { deleteProduct, fetchProducts } from "./action-creators/product";

const initialState: ProductState = {
    products: [],
    loading: false,
    error: null
}

export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchProducts.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = 'Error, products are not found';
            })
    }
});

export default productsSlice.reducer;