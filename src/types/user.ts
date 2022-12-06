export interface User {
    id: number | null;
    name?: string;
    role?: userRoles;
}

export enum userRoles {
    Admin = "admin",
    Manager = "manager",
    Seller = "seller",
    Customer = "customer",
}

export interface UserState {
    user: User;
    loading: boolean;
    error: null | string;
}