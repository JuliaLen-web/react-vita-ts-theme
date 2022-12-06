import { createAsyncThunk } from "@reduxjs/toolkit"
import _ from "lodash";
import { Products } from "../../types/product";
import fakerData from "../../utils/faker"

const productsObj: Products = []

fakerData.map((faker, fakerKey) => {
    if(fakerKey >= 20) return false
    productsObj[fakerKey] = {
        name: faker.products[0].name,
        seller: faker.users[0].name,
        price: Math.ceil(Math.random() * 1000),
        stock: faker.trueFalse[0],
        image: "/src/assets/images/fakers/preview-" + Math.ceil(Math.random() * 15) + ".jpg",
        status: faker.statusProduct[0],
        category: faker.products[0].category,
        description: faker.products[1].name + faker.users[1].name + 'bla',
        featured: faker.trueFalse[0],
        id: fakerKey + 1,
    }
})

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (): Promise<Products> => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(productsObj), 1000);
        });
    }
)