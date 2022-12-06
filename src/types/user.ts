export interface User {
    id?: number;
    name?: string;
    role?: userRoles;
}

export enum userRoles {
    Admin = "admin",
    Manager = "manager",
    Seller = "seller",
    Customer = "customer",
}

// export enum UserActionTypes {
//     FETCH_USER = 'FETCH_USER',
//     FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS',
//     FETCH_USER_ERROR = 'FETCH_USER_ERROR'
// }

// interface FetchUserAction {
//     type: UserActionTypes.FETCH_USER
// }

// interface FetchUserActionSuccess {
//     type: UserActionTypes.FETCH_USER_SUCCESS,
//     payload: any[]
// }

// interface FetchUserActionError {
//     type: UserActionTypes.FETCH_USER_ERROR,
//     payload: string
// }

// export type UserAction = FetchUserAction | FetchUserActionSuccess | FetchUserActionError

export interface UserState {
    user: User;
    loading: boolean;
    error: null | string;
}