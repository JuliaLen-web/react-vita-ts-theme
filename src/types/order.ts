export interface Order {
    name?: string;
    buyer?: string;
    seller?: string;
    price?: number;
    stock?: boolean;
    image?: string;
    status?: string;
    category?: string;
    date?: string;
    id?: number;
}

export type Orders = Order[]

export interface OrderState {
    orders: [] | Orders;
    loading: boolean;
    error: null | string;
}
