import { createSlice } from "@reduxjs/toolkit";
import { TransactionsState } from "../types/transaction";
import { fetchTransactions } from "./action-creators/transactions";
import { RootState } from "./store";

const initialState: TransactionsState = {
    transactions: [],
    loading: false,
    error: null
}

export const transactionsSlice = createSlice({
    name: "transactions",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchTransactions.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(fetchTransactions.fulfilled, (state, action) => {
                state.loading = false;
                state.transactions = action.payload;
            })
            .addCase(fetchTransactions.rejected, (state, action) => {
                state.loading = false;
                state.error = 'Error, transactions are not found';
            })
    }
})

export const selectTransactions = (state: RootState) => state.transactions.transactions;
export const selectTransactionsLoading = (state: RootState) => state.transactions.loading;

export default transactionsSlice.reducer;