import { createAsyncThunk } from "@reduxjs/toolkit"
import { User } from "../../types/user";
import fakerData from "../../utils/faker"

export const fetchUserInfo = createAsyncThunk(
    'users/fetchUserInfo',
    async (): Promise<User> => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(fakerData[0].user[0]), 1000);
        });
    }

)
