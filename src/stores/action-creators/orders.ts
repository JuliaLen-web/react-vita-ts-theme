import { createAsyncThunk } from "@reduxjs/toolkit"
import _ from "lodash";
import { Orders } from "../../types/order";
import { userRoles } from "../../types/user";
import fakerData from "../../utils/faker"
import { RootState } from "../store";


export const fetchOrders = createAsyncThunk(
    'orders/fetchOrders',
    async (_, { getState }): Promise<Orders> => {

        const ordersArray: Orders = []

        fakerData.slice(0, 20).map((faker, fakerKey) => {
            ordersArray.push({
                id: fakerKey + 1,
                name: faker.products[0].name,
                buyer: faker.users[0].name,
                seller: faker.users[1].name,
                price: Math.ceil(Math.random() * 1000),
                stock: faker.trueFalse[0],
                image: "/src/assets/images/fakers/preview-" + Math.ceil(Math.random() * 15) + ".jpg",
                status: faker.statusOrder[0],
                date: faker.dates[0],
                category: faker.products[0].category,
            })
        })

        const { user } = getState() as RootState
        const userInfo = user.user

        let newOrdersArray: Orders = []

        switch (userInfo.role) {
            case userRoles.Seller:
                newOrdersArray = ordersArray.filter(order => order.seller === userInfo.name)
                break
            case userRoles.Customer:
                newOrdersArray = ordersArray.filter(order => order.buyer === userInfo.name)
                break
            default:
                newOrdersArray = ordersArray
                break
        }

        return new Promise((resolve) => {
            setTimeout(() => resolve(newOrdersArray), 1000);
        });
    }
)
