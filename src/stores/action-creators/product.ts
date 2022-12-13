import { createAsyncThunk } from "@reduxjs/toolkit"
import _ from "lodash";
import { Products } from "../../types/product";
import { userRoles } from "../../types/user";
import fakerData from "../../utils/faker"
import { RootState } from "../store";

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (_, { getState }): Promise<Products> => {

        const productsArray: Products = []

        fakerData.slice(0, 20).map((faker, fakerKey) => {
            productsArray.push({
                id: fakerKey + 1,
                name: faker.products[0].name,
                seller: faker.users[0].name,
                price: Math.ceil(Math.random() * 1000),
                stock: faker.trueFalse[0],
                image: "/src/assets/images/fakers/preview-" + Math.ceil(Math.random() * 15) + ".jpg",
                status: faker.statusProduct[0],
                category: faker.products[0].category,
                description: faker.products[1].name + faker.users[1].name + 'bla',
                featured: faker.trueFalse[0],
            })
        })

        const { user } = getState() as RootState
        const userInfo = user.user

        let newProductsArray: Products = []

        switch (userInfo.role) {
            case userRoles.Manager:
                newProductsArray = productsArray.filter(product => product.status === "approved")
                break
            case userRoles.Seller:
                newProductsArray = productsArray.filter(product => product.seller === userInfo.name)
                break
            case userRoles.Customer:
                newProductsArray = productsArray.filter(product => product.status === "approved" && product.stock)
                break
            default:
                newProductsArray = productsArray
                break
        }

        return new Promise((resolve) => {
            setTimeout(() => resolve(newProductsArray), 1000);
        });
    }
)

export const deleteProduct = createAsyncThunk(
    'products/deleteProduct',
    async (productId: number, { getState }): Promise<Products> => {
        const { products } = getState() as RootState
        const productsState = products.products
        const newProductsArray = productsState.filter(el => el.id != productId)
        return new Promise((resolve) => {
            setTimeout(() => resolve(newProductsArray), 1000);
        });
    }
)