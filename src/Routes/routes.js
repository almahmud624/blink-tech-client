import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import AddProduct from "../Pages/Admin/AddProduct/AddProduct";
import Home from "../Pages/Home/Home";
import Products from "../Pages/Products/Products";
import ErrorPage from "../Pages/Shared/ErrorPage";
import Authentication from "../Pages/Authentication/Authentication";
import CheckOut from "../Pages/CheckOut/CheckOut";
import Orders from "../Pages/Orders/Orders";
import Dashboard from "../Pages/Admin/Dashboard/Dashboard";
import AllProduct from "../Pages/Admin/AllProduct/AllProduct";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/add-products",
        element: <AddProduct />,
      },
      {
        path: "/register",
        element: <Authentication />,
      },
      {
        path: "/login",
        element: <Authentication />,
      },
      {
        path: "/orders",
        element: <Orders />,
      },
      {
        path: "/checkout/:id",
        element: <CheckOut />,
        loader: ({ params }) =>
          fetch(`https://blink-tech-server.vercel.app/products/${params.id}`),
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
          { index: true, element: <AllProduct /> },
          { path: "all-products", element: <AllProduct /> },
          { path: "add-products", element: <AddProduct /> },
        ],
      },
    ],
  },
]);
