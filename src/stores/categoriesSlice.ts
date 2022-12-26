import { createSlice } from "@reduxjs/toolkit";
import { CategoriesState } from "../types/category";
import { addCategory, deleteCategory, editCategory, fetchCategories } from "./action-creators/categories";
import { RootState } from "./store";

const initialState: CategoriesState = {
    categories: [],
    loading: false,
    error: null
}

export const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchCategories.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = 'Error, categories are not found';
            })
            .addCase(deleteCategory.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = 'Error, categories are not found';
            })
            .addCase(editCategory.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(editCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(editCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = 'Error, categories are not found';
            })
            .addCase(addCategory.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(addCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(addCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = 'Error, categories are not found';
            })
    }
});


export const selectCategories = (state: RootState) => state.categories.categories;
export const selectCategoriesLoading = (state: RootState) => state.categories.loading;

export default categoriesSlice.reducer;