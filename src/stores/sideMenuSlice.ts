import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { icons } from "../base-components/Lucide";
import { userRoles } from "./userSlice";

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
      pathname: "/product-grid",
      title: "Products",
      roles: [userRoles.Admin, userRoles.Seller, userRoles.Manager, userRoles.Customer]
    },
    {
      icon: "Zap",
      pathname: "/product-list",
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
      pathname: "/users-layout-2",
      title: "Users",
      roles: [userRoles.Admin, userRoles.Seller]
    },
    {
      icon: "Trello",
      pathname: "/profile-overview-1",
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


export const selectMenuByRole = (userRole: userRoles) => createSelector(selectSideMenu, (menuItems) => {
  if (!userRole) return []

  return menuItems.filter(menuItem => {
    if (typeof menuItem === 'string') return true
    return menuItem.roles.includes(userRole)
  })
})

export default sideMenuSlice.reducer;
