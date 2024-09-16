import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import darkModeReducer from "./darkModeSlice";
import colorSchemeReducer from "./colorSchemeSlice";
import sideMenuReducer from "./sideMenuSlice";
import userReducer from "./userSlice"
import dashboardSlice from "./dashboardSlice";
import productsSlice  from "./productSlice";
import categoriesSlice from "./categoriesSlice";
import ordersSlice from "./orderSlice";
import transactionSlice from "./transactionSlice";

export const store = configureStore({
  reducer: {
    categories: categoriesSlice,
    colorScheme: colorSchemeReducer,
    darkMode: darkModeReducer,
    dashboard: dashboardSlice,
    orders: ordersSlice,
    products: productsSlice,
    sideMenu: sideMenuReducer,
    transactions: transactionSlice,
    user: userReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
