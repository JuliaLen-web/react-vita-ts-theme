import { createAsyncThunk } from "@reduxjs/toolkit"
import fakerData from "../../utils/faker"

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    return fakerData[0].authUser[0]
})