import { createAsyncThunk } from "@reduxjs/toolkit"
import _ from "lodash";
import { userRoles } from "../../types/user";
import fakerData from "../../utils/faker"
import { RootState } from "../store";
import { Transactions } from "../../types/transaction";


export const fetchTransactions = createAsyncThunk(
    'orders/fetchTransactions',
    async (_, { getState }): Promise<Transactions> => {

        const transactionsArray: Transactions = []

        fakerData.slice(0, 20).map((faker, fakerKey) => {
            transactionsArray.push({
                id: fakerKey + 1,
                invoice: faker.totals[0],
                buyer: faker.users[0].name,
                seller: faker.users[1].name,
                status:  faker.trueFalse[0] ? 'Active' : 'Inactive',
                payment: faker.trueFalse[0] ? 'Checking payments' : 'Direct bank transfer',
                date: faker.dates[0],
                sum: faker.totals[1],
            })
        })

        // const { user } = getState() as RootState
        // const userInfo = user.user

        let newTransactionsArray: Transactions = transactionsArray

        return new Promise((resolve) => {
            setTimeout(() => resolve(newTransactionsArray), 1000);
        });
    }
)
