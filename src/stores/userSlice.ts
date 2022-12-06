import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "../types/user";
import { fetchUserInfo } from "./action-creators/user";

const initialState: UserState = {
    user: {
        id: null,
    },
    loading: false,
    error: null
}

export const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchUserInfo.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(fetchUserInfo.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(fetchUserInfo.rejected, (state, action) => {
                state.loading = false;
                state.error = 'Error, user is not found';
            })
    }
});


export default userSlice.reducer;

