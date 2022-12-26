import { createAsyncThunk } from "@reduxjs/toolkit"
import _ from "lodash";
import { Categories, Category } from "../../types/category";
import fakerData from "../../utils/faker";
import { RootState } from "../store";

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

export const deleteCategory = createAsyncThunk(
    'products/deleteCategory',
    async (categoryId: number, { getState }): Promise<Categories> => {
        const { categories } = getState() as RootState
        const categoriesState = categories.categories
        const newCategoriesArray = categoriesState.filter(el => el.id != categoryId)
        return new Promise((resolve) => {
            setTimeout(() => resolve(newCategoriesArray), 1000);
        });
    }
)

export const editCategory = createAsyncThunk(
    'products/editCategory',
    async (newCategory: Category, { getState }): Promise<Categories> => {
        const { categories } = getState() as RootState
        const categoriesState = categories.categories
        newCategory.slug = _.replace(
            _.replace(_.toLower(newCategory.name), / /g, "-"),
            "&",
            "and"
        )
        const newCategoriesArray = categoriesState.map(el => {
            if (el.id === newCategory.id) {
                el = newCategory
            }
            return el
        })
        return new Promise((resolve) => {
            setTimeout(() => resolve(newCategoriesArray), 1000);
        });
    }
)

export const addCategory = createAsyncThunk(
    'products/addCategory',
    async (newCategory: Category, { getState }): Promise<Categories> => {
        const { categories } = getState() as RootState
        const categoriesState = categories.categories
        const newCategoriesArray: Categories = []
        newCategory.id = 999
        newCategory.slug = _.replace(
            _.replace(_.toLower(newCategory.name), / /g, "-"),
            "&",
            "and"
        )
        newCategory.images = [
            "/src/assets/images/fakers/preview-" + 2 + ".jpg",
            "/src/assets/images/fakers/preview-" + 3 + ".jpg",
            "/src/assets/images/fakers/preview-" + 4 + ".jpg"
        ]
        newCategoriesArray.push(...categoriesState, newCategory)
        return new Promise((resolve) => {
            setTimeout(() => resolve(newCategoriesArray), 1000);
        });
    }
)