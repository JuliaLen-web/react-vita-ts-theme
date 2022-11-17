import { createSlice } from "@reduxjs/toolkit";
import { icons } from "lucide";
import { RootState } from "./store";
import { userRoles } from "./userSlice";

export interface DashboardItem {
    title: string;
    sum: number;
    difference?: number;
    icon?: keyof typeof icons;
    status?: string;
    link?: string;
}

type RoleItems = {
    [key in userRoles]:  DashboardItem[]
}

const initialState: RoleItems = {
    [userRoles.Admin]: [
        {
            title: 'Total customers',
            sum: 5,
            difference: 33,
            icon: 'User',
            status: 'text-primary',
            link: '/users-layout-2'
        },
        {
            title: 'Total orders',
            sum: 456,
            difference: 5,
            status: 'text-pending',
            link: '/product-list'
        },
        {
            title: 'Total products',
            sum: 44,
            difference: -33,
            icon: 'CreditCard',
            status: 'text-warning',
            link: '/product-grid'
        },
        {
            title: 'Total amount',
            sum: 3232,
            difference: 13,
            status: 'text-success',
            link: '/transaction-list'
        },
        {
            title: 'Total costs',
            sum: 12124,
            difference: -3,
            link: '/transaction-list'
        },
        {
            title: 'Total profit',
            sum: 3333,
            difference: 33,
            link: '/transaction-list'
        },
    ],
    [userRoles.Manager]: [
        {
            title: 'Total customers',
            sum: 5,
            difference: 43,
            icon: 'User',
            status: 'text-primary',
            link: '/users-layout-2'
        },
        {
            title: 'Total orders',
            sum: 456,
            difference: 5,
            status: 'text-pending',
            link: '/product-list'
        },
        {
            title: 'Total products',
            sum: 44,
            difference: -33,
            icon: 'CreditCard',
            status: 'text-warning',
            link: '/product-grid'
        },
        {
            title: 'Total amount',
            sum: 3232,
            difference: 13,
            status: 'text-success',
            link: '/transaction-list'
        },
        {
            title: 'Total costs',
            sum: 12124,
            difference: -3,
            link: '/transaction-list'
        },
        {
            title: 'Total profit',
            sum: 3333,
            difference: 33,
            link: '/transaction-list'
        },
    ],
    [userRoles.Seller]: [
        {
            title: 'Total customers',
            sum: 5,
            icon: 'User',
            status: 'text-primary',
            link: '/users-layout-2'
        },
        {
            title: 'Total orders',
            sum: 756,
            difference: 5,
            status: 'text-pending',
            link: '/product-list'
        },
        {
            title: 'Balance of accounts',
            sum: 44,
            difference: -33,
            icon: 'CreditCard',
            status: 'text-warning',
            link: '/product-grid'
        },
        {
            title: 'Total amount',
            sum: 9232,
            difference: 13,
            status: 'text-success',
            link: '/transaction-list'
        },
        {
            title: 'Total profit',
            sum: 3333,
            difference: 33,
            link: '/transaction-list'
        },
    ],
    [userRoles.Customer]: [
        {
            title: 'Total orders',
            sum: 456,
            difference: 5,
            icon: '',
            status: 'text-pending',
            link: '/product-list'
        },
        {
            title: 'New order',
            sum: 44,
            difference: -33,
            icon: 'CreditCard',
            status: 'text-warning',
            link: '/product-list'
        },
        {
            title: 'Total costs',
            sum: 7733,
            difference: 33,
            icon: '',
            link: '/transaction-list'
        },
    ],
}

export const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {},
});

export const selectDashboard = (state: RootState) => state.dashboard;

export default dashboardSlice.reducer;
