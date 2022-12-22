import { useRoutes } from "react-router-dom";
import SideMenu from "../layouts/SideMenu";
import DashboardPage from "../pages/DashboardPage";
import Categories from "../pages/Categories";
import AddProduct from "../pages/AddProduct";
import OrdersPage from "../pages/OrdersPage";
import ProductsPage from "../pages/ProductsPage";
import TransactionList from "../pages/TransactionList";
import TransactionDetail from "../pages/TransactionDetail";
import SellerList from "../pages/SellerList";
import SellerDetail from "../pages/SellerDetail";
import CrudForm from "../pages/CrudForm";
import UsersPage from "../pages/UsersPage";
import ProfileUser from "../pages/ProfileUser";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ErrorPage from "../pages/ErrorPage";
import ProfileSettings from "../pages/ProfileSettings";
import Notification from "../pages/Notification";
import RegularForm from "../pages/RegularForm";
import Validation from "../pages/Validation";

function Router() {
  const routes = [
    {
      path: "/",
      element: <SideMenu />,
      children: [
        {
          path: "/",
          element: <DashboardPage />,
        },
        {
          path: "categories",
          element: <Categories />,
        },
        {
          path: "add-product",
          element: <AddProduct />,
        },
        {
          path: "orders-page",
          element: <OrdersPage />,
        },
        {
          path: "product-page",
          element: <ProductsPage />,
        },
        {
          path: "transaction-list",
          element: <TransactionList />,
        },
        {
          path: "transaction-detail",
          element: <TransactionDetail />,
        },
        {
          path: "seller-list",
          element: <SellerList />,
        },
        {
          path: "seller-detail",
          element: <SellerDetail />,
        },
        {
          path: "crud-form",
          element: <CrudForm />,
        },
        {
          path: "users-page",
          element: <UsersPage />,
        },
        {
          path: "profile-page",
          element: <ProfileUser />,
        },
        {
          path: "profile-settings",
          element: <ProfileSettings />,
        },
        {
          path: "notification",
          element: <Notification />,
        },
        {
          path: "regular-form",
          element: <RegularForm />,
        },
        {
          path: "validation",
          element: <Validation />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/error-page",
      element: <ErrorPage />,
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ];

  return useRoutes(routes);
}

export default Router;
