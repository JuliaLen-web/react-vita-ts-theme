import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { icons } from "../base-components/Lucide";

export interface Menu {
  icon: keyof typeof icons;
  title: string;
  pathname?: string;
  subMenu?: Menu[];
  ignore?: boolean;
}

export interface SideMenuState {
  menu: Array<Menu | "devider">;
}

const initialState: SideMenuState = {
  menu: [
    {
      icon: "Home",
      pathname: "/",
      title: "Dashboard",
    },
    {
      icon: "Activity",
      pathname: "/product-grid",
      title: "Products",
    },
    {
      icon: "Zap",
      pathname: "/product-list",
      title: "Orders",
    },
    {
      icon: "Zap",
      pathname: "/transaction-list",
      title: "Transactions",
    },
    {
      icon: "Users",
      pathname: "/users-layout-2",
      title: "Users",
    },
    {
      icon: "Trello",
      pathname: "/profile-overview-1",
      title: "Profile",
    },
    "devider",
    {
      icon: "Trello",
      pathname: "/categories",
      title: "Categories",
    },
    {
      icon: "Trello",
      pathname: "/seller-detail",
      title: "Seller",
    },
    {
      icon: "Trello",
      pathname: "/seller-list",
      title: "SellerList",
    },
    {
      icon: "Trello",
      pathname: "/transaction-detail",
      title: "Order details",
    },
  ],
};

export const sideMenuSlice = createSlice({
  name: "sideMenu",
  initialState,
  reducers: {},
});

export const selectSideMenu = (state: RootState) => state.sideMenu.menu;

export default sideMenuSlice.reducer;
