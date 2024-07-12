export const NAVIGATION_ROUTES = {
  LOGIN: "/login",
  DASHBOARD: "/",
  PRODUCT: "/product",
  PRODUCT_DETAIL: "/product/:productId",
  // admin routes
  ADMIN_DASHBOARD: "/dashboard",
  // products
  VIEW_PRODUCTS: "/dashboard/products",
  ADD_PRODUCT: "/dashboard/add_product",
  EDIT_PRODUCT: "/dashboard/edit_product/:productId",

  // users
  VIEW_USERS: "/dashboard/users",
  ADD_USER: "/dashboard/add_user",
  EDIT_USER: "/dashboard/edit_user/:userId",
  EDIT_USERS: "/dashboard/edit_user/",

  // cart
  CART: "/dashboard/cart",
  USER_CART: "/cart/:user_id",
};
