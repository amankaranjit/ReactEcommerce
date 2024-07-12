import { useRoutes } from "react-router-dom";
import { NAVIGATION_ROUTES } from "./routes.constant";
import Login from "src/pages/Auth/Login";
import Detail from "../pages/Product/Detail";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import Dashboard from "../pages/Dashboard";
import EditProduct from "../pages/Admin/Product/EditProduct";
import AddProduct from "../pages/Admin/Product/AddProduct";
import ViewProducts from "../pages/Admin/Product/ViewProducts";
import ViewUsers from "../pages/Admin/User/ViewUsers";
import EditUser from "../pages/Admin/User/EditUser";
import AddUser from "../pages/Admin/User/AddUser";
import Cart from "../pages/Admin/Cart/Cart";
import UserCart from "../pages/Cart/UserCart";

const routes = [
  { path: NAVIGATION_ROUTES.DASHBOARD, element: <Dashboard /> },
  {
    path: NAVIGATION_ROUTES.LOGIN,
    element: <Login />,
  },
  {
    path: NAVIGATION_ROUTES.PRODUCT_DETAIL,
    element: <Detail />,
  },
  {
    path: NAVIGATION_ROUTES.ADMIN_DASHBOARD,
    element: <AdminDashboard />,
  },
  {
    path: NAVIGATION_ROUTES.VIEW_PRODUCTS,
    element: <ViewProducts />,
  },
  {
    path: NAVIGATION_ROUTES.ADD_PRODUCT,
    element: <AddProduct />,
  },
  {
    path: NAVIGATION_ROUTES.EDIT_PRODUCT,
    element: <EditProduct />,
  },
  {
    path: NAVIGATION_ROUTES.VIEW_USERS,
    element: <ViewUsers />,
  },
  {
    path: NAVIGATION_ROUTES.EDIT_USER,
    element: <EditUser />,
  },
  {
    path: NAVIGATION_ROUTES.ADD_USER,
    element: <AddUser />,
  },
  {
    path: NAVIGATION_ROUTES.CART,
    element: <Cart />,
  },
  {
    path: NAVIGATION_ROUTES.USER_CART,
    element: <UserCart />,
  },
];

const AppRoutes = () => {
  return useRoutes(routes);
};

export default AppRoutes;
