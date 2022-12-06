export interface Product {
    name?: string;
    seller?: string;
    price?: number;
    stock?: boolean;
    image?: string;
    status?: string;
    category?: string;
    description?: string;
    featured?: boolean;
    id?: number;
}

export type Products = Product[]

export interface ProductState {
    products: [] | Products;
    loading: boolean;
    error: null | string;
}
