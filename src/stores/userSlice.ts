import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface User {
    name?: string;
    role?: userRoles;
}

export enum userRoles {
    Admin = "admin",
    Manager = "manager",
    Seller = "seller",
    Customer = "customer",
}

const initialState: User = {}

export const userSlice = createSlice({
    name: "userInfo",
    initialState,
    reducers: {
        loadUser: (state) => {
            state.name = 'Ivan';
            state.role = userRoles.Seller;
        },
    },
});

export const { loadUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;

