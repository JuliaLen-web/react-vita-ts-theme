import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "../types/user";
import { fetchUsers } from "./action-creators/user";

const initialState: UserState = {
    user: {},
    loading: false,
    error: null
}

export const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
    },
    extraReducers(builder) {
        builder
            .addCase(fetchUsers.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = 'Error, user is not found';
            })
    }
});


export default userSlice.reducer;

