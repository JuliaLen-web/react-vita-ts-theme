import { createSlice } from "@reduxjs/toolkit";
import { icons } from "../base-components/Lucide";
import { RootState } from "./store";

export interface Product {
    name: string;
    seller?: string;
    price: number;
    stock: boolean;
    image?: string;
    status: string;
    category: string;
    description?: string;
    featured?: boolean;
    id: number;
}

type Products = Product[]

const initialState: Products = [
    {
        name: "Dell XPS 13",
        seller: "Bruce Willis",
        price: Math.ceil(Math.random() * 1000),
        stock: true,
        image: "/src/assets/images/fakers/preview-" + Math.ceil(Math.random() * 15) + ".jpg",
        status: "approved",
        category: "PC & Laptop",
        description: "PC & Laptop PC & Laptop PC & Laptop PC & Laptop PC & Laptop PC & Laptop PC & Laptop PC & Laptop",
        featured: true,
        id: 1,
    },
    {
        name: "Apple MacBook Pro 13",
        seller: "John Travolta",
        price: Math.ceil(Math.random() * 1000),
        stock: true,
        image: "/src/assets/images/fakers/preview-" + Math.ceil(Math.random() * 15) + ".jpg",
        status: "rejected",
        category: "PC & Laptop",
        description: "PC & Laptop PC & Laptop C & Laptop PC & Laptop PC & Laptop PC & Laptop",
        id: 2,
    },
    {
        name: "Oppo Find X2 Pro",
        seller: "Bruce Willis",
        price: Math.ceil(Math.random() * 1000),
        stock: false,
        image: "/src/assets/images/fakers/preview-" + Math.ceil(Math.random() * 15) + ".jpg",
        status: "moderation",
        category: "Smartphone & Tablet",
        description: "PC & Laptop PC & Laptop PC & & Laptop PC & Laptop PC & Laptop",
        featured: true,
        id: 3,
    },
    {
        name: "Samsung Galaxy S20 Ultra",
        seller: "Bruce Willis",
        price: Math.ceil(Math.random() * 1000),
        stock: false,
        image: "/src/assets/images/fakers/preview-" + Math.ceil(Math.random() * 15) + ".jpg",
        status: "moderation",
        category: "Smartphone & Tablet",
        description: "PC & Laptop PC & Laptop PC & & Laptop PC & Laptop PC & Laptop",
        featured: true,
        id: 4,
    },
    {
        name: "Sony Master Series A9G",
        seller: "Leonardo DiCaprio",
        price: Math.ceil(Math.random() * 1000),
        stock: false,
        image: "/src/assets/images/fakers/preview-" + Math.ceil(Math.random() * 15) + ".jpg",
        status: "rejected",
        category: "Electronic",
        description: "PC & Laptop PC & Laptsasa sasasascfascLaptop PC & Laptop PC & Laptop",
        id: 55,
    },
    {
        name: "Samsung Q90 QLED TV",
        seller: "Leonardo DiCaprio",
        price: Math.ceil(Math.random() * 1000),
        stock: true,
        image: "/src/assets/images/fakers/preview-" + Math.ceil(Math.random() * 15) + ".jpg",
        status: "moderation",
        category: "Electronic",
        description: "PC & Laptop PC & Laptsasa sasasascfascLaptop PC & Laptop PC & Laptop",
        id: 100,
    },
    {
        name: "Nike Air Max 270",
        seller: "Bruce Willis",
        price: Math.ceil(Math.random() * 1000),
        stock: true,
        image: "/src/assets/images/fakers/preview-" + Math.ceil(Math.random() * 15) + ".jpg",
        status: "rejected",
        category: "Sport & Outdoor",
        description: "PC & Laptop PC & Laptsasa sasasascfassasasaaaaaaaaaaaaaacLaptop PC & Laptop PC & Laptop",
        id: 111,
    },
    {
        name: "Nike Tanjun",
        seller: "Leonardo DiCaprio",
        price: Math.ceil(Math.random() * 1000),
        stock: true,
        image: "/src/assets/images/fakers/preview-" + Math.ceil(Math.random() * 15) + ".jpg",
        status: "approved",
        category: "Sport & Outdoor",
        description: "PC & Laptop PC & Laptop PC & Laptop",
        id: 122,
    },
    {
        name: "Sony A7 III",
        seller: "Tom Cruise",
        price: Math.ceil(Math.random() * 1000),
        stock: false,
        image: "/src/assets/images/fakers/preview-" + Math.ceil(Math.random() * 15) + ".jpg",
        status: "approved",
        category: "Photography",
        id: 156,
    },
]

export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
});

export const selectProducts = (state: RootState) => state.products;

export default productsSlice.reducer;