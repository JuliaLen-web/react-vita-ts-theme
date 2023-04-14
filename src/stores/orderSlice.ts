import { createSlice } from "@reduxjs/toolkit";
import { OrderState } from "../types/order";
import { fetchOrders } from "./action-creators/orders";
import { RootState } from "./store";

const initialState: OrderState = {
    orders: [],
    loading: false,
    error: null
}


export const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchOrders.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = 'Error, orders are not found';
            })
    }
});

export const selectOrders = (state: RootState) => state.orders.orders;
export const selectOrdersLoading = (state: RootState) => state.orders.loading;

export default ordersSlice.reducer;