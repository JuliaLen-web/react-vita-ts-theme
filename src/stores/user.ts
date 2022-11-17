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
    name: 'Ivan',
    role: userRoles.Seller
}

export default function rootReducer(state = initialState) {
    return state
}