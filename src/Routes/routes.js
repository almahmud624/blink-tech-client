import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import AddProduct from "../Pages/Dashboard/AddProduct/AddProduct";
import Home from "../Pages/Home/Home";
import Products from "../Pages/Products/Products";
import ErrorPage from "../Pages/Shared/ErrorPage";
import Authentication from "../Pages/Authentication/Authentication";
import CheckOut from "../Pages/CheckOut/CheckOut";
import Orders from "../Pages/Orders/Orders";
import Dashboard from "../Pages/Dashboard/Dashboard/Dashboard";
import ProductDetails from "../Pages/ProductDetails/ProductDetails";
import Cart from "../Pages/Cart/Cart";
import TechDoc from "../Pages/TechDoc/TechDoc/TechDoc";
import UserProfile from "../Pages/UserProfile/UserProfile";
import MyAppointments from "../Pages/Dashboard/MyAppointments/MyAppointments";
import AllProduct from "../Pages/Dashboard/AllProduct/AllProduct";
import Users from "../Pages/Dashboard/Users/Users";
import PrivateRouter from "../PrivateRoute/PrivateRouter/PrivateRouter";
import AdminRouter from "../PrivateRoute/AdminRouter/AdminRouter";
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
        path: "/product-details/:id",
        element: <ProductDetails />,
        loader: ({ params }) =>
          fetch(`http://localhost:4000/products/${params.id}`),
      },
      {
        path: "/cart",
        element: <Cart />,
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
        path: "/checkout",
        element: (
          <PrivateRouter>
            <CheckOut />
          </PrivateRouter>
        ),
        // loader: ({ params }) =>
        //   fetch(`http://localhost:4000/products/${params.id}`),
      },
      {
        path: "/tech-doc",
        element: <TechDoc />,
      },
      {
        path: "/profile",
        element: (
          <PrivateRouter>
            <UserProfile />
          </PrivateRouter>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRouter>
            <Dashboard />
          </PrivateRouter>
        ),
        children: [
          { index: true, element: <AllProduct /> },
          { path: "all-products", element: <AllProduct /> },
          { path: "add-products", element: <AddProduct /> },
          {
            path: "orders",
            element: <Orders />,
          },
          {
            path: "my-appointments",
            element: <MyAppointments />,
          },
          {
            path: "my-appointments",
            element: <MyAppointments />,
          },
          {
            path: "users",
            element: (
              <AdminRouter>
                <Users />
              </AdminRouter>
            ),
          },
        ],
      },
    ],
  },
]);
