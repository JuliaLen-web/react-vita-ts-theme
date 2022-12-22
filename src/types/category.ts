export interface Category {
    id?: number;
    name?: string;
    images?: string[];
    slug: string;
}

export type Categories = Category[]

export interface CategoriesState {
    categories: [] | Categories;
    loading: boolean;
    error: null | string;
}