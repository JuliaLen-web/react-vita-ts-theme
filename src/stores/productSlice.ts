import { createSlice } from "@reduxjs/toolkit";
import { ProductState } from "../types/product";
import { addProduct, deleteProduct, editProduct, fetchProducts } from "./action-creators/product";
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
            .addCase(editProduct.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(editProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(editProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = 'Error, product was not be edited';
            })
            .addCase(addProduct.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = 'Error, product was not be edited';
            })
    }
});

export const selectProducts = (state: RootState) => state.products.products;
export const selectProductsLoading = (state: RootState) => state.products.loading;

export default productsSlice.reducer;