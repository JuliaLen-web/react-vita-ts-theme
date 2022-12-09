import { createAsyncThunk } from "@reduxjs/toolkit"
import _ from "lodash";
import { Products } from "../../types/product";
import fakerData from "../../utils/faker"

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

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (): Promise<Products> => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(productsArray), 1000);
        });
    }
)

export const deleteProduct = createAsyncThunk(
    'products/deleteProduct',
    async (productId: number): Promise<Products> => {
        const newProductsArray = productsArray.filter(el => el.id != productId)
        console.log(newProductsArray);
        return new Promise((resolve) => {
            setTimeout(() => resolve(newProductsArray), 1000);
        });
    }
)