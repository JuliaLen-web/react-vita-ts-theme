import { createSlice } from "@reduxjs/toolkit";
import { ProductState } from "../types/product";
import { deleteProduct, fetchProducts } from "./action-creators/product";
import { RootState } from "./store";

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
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = 'Error, products are not found';
            })
            .addCase(deleteProduct.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = 'Error, products was not be deleted';
            })
    }
});

export const selectProducts = (state: RootState) => state.products.products;

export default productsSlice.reducer;