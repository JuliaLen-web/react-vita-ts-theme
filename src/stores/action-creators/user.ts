import { createAsyncThunk } from "@reduxjs/toolkit"
import { User, userRoles } from "../../types/user";

export const fetchUserInfo = createAsyncThunk(
    'users/fetchUserInfo',
    async (): Promise<User> => {
        return new Promise((resolve) => {
            setTimeout(() => resolve({ id: 9, name: "Bruce Willis", role: userRoles.Admin }), 1000);
        });
    }
)
