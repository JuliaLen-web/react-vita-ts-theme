import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface User {
    name: string;
    role: string;
}

export enum userRoles {
    Admin = "admin",
    Manager = "manager",
    Seller = "seller",
    Customer = "customer",
}

const initialState: User = {
    name: '',
    role: '',
}

export const userSlice = createSlice({
    name: "userAuth",
    initialState,
    reducers: {
        setUserProfile: (state, action) => {
            return {
                name: 'Ivan',
                role: userRoles.Customer
            }
        }
    },
  });


export const selectUser = (state: RootState): User => state.userAuth;

export default userSlice.reducer;