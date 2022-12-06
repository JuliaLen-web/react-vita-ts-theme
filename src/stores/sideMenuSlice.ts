import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { icons } from "../base-components/Lucide";
import { userRoles } from "../types/user";

export interface Menu {
  icon: keyof typeof icons;
  title: string;
  pathname?: string;
  subMenu?: Menu[];
  ignore?: boolean;
  roles: userRoles[];
}

export interface SideMenuState {
  menu: Menu[];
}

const initialState: SideMenuState = {
  menu: [
    {
      icon: "Home",
      pathname: "/",
      title: "Dashboard",
      roles: [userRoles.Admin, userRoles.Seller, userRoles.Manager, userRoles.Customer]
    },
    {
      icon: "Activity",
      pathname: "/product-page",
      title: "Products",
      roles: [userRoles.Admin, userRoles.Seller, userRoles.Manager, userRoles.Customer]
    },
    {
      icon: "Zap",
      pathname: "/orders-page",
      title: "Orders",
      roles: [userRoles.Admin, userRoles.Seller, userRoles.Manager, userRoles.Customer]
    },
    {
      icon: "Zap",
      pathname: "/transaction-list",
      title: "Transactions",
      roles: [userRoles.Admin, userRoles.Seller, userRoles.Manager, userRoles.Customer]
    },
    {
      icon: "Users",
      pathname: "/users-page",
      title: "Users",
      roles: [userRoles.Admin, userRoles.Manager]
    },
    {
      icon: "Trello",
      pathname: "/profile-settings",
      title: "Profile",
      roles: [userRoles.Admin, userRoles.Seller, userRoles.Manager, userRoles.Customer]
    }
  ],
};

export const sideMenuSlice = createSlice({
  name: "sideMenu",
  initialState,
  reducers: {},
});

export const selectSideMenu = (state: RootState) => state.sideMenu.menu;


export const selectMenuByRole = (userRole?: userRoles) => createSelector(selectSideMenu, (menuItems) => {
  if (!userRole) return []

  return menuItems.filter(menuItem => {
    return menuItem.roles.includes(userRole)
  })
})

export default sideMenuSlice.reducer;
