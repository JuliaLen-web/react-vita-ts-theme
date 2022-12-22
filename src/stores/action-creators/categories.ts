import { createAsyncThunk } from "@reduxjs/toolkit"
import _ from "lodash";
import { Categories } from "../../types/category";
import fakerData from "../../utils/faker";

export const fetchCategories = createAsyncThunk(
    'products/fetchCategories',
    async (): Promise<Categories> => {

        const categoriesArray: Categories = []

        let img = "/src/assets/images/fakers/preview-" + Math.ceil(Math.random() * 15) + ".jpg"

        fakerData[0].categories.map((category, fakerKey) => {
            categoriesArray.push({
                id: fakerKey + 1,
                name: category.name,
                images: [ 
                    "/src/assets/images/fakers/preview-" + 1 + ".jpg",
                    "/src/assets/images/fakers/preview-" + 5 + ".jpg",
                    "/src/assets/images/fakers/preview-" + 6 + ".jpg"
                 ],
                slug: category.slug,
            })
        })

        return new Promise((resolve) => {
            setTimeout(() => resolve(categoriesArray), 1000);
        });
    }
)