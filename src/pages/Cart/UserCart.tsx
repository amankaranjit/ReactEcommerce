import Card from "../../component/cart/Card";
import { cartApiUrl } from "../../constants/constants";
import useApiCall from "../../hooks/useApiCall";
import { cartType } from "../../types/types";
import Typography from "../../component/Typography";
import { useNavigate, useParams } from "react-router-dom";
import { NAVIGATION_ROUTES } from "../../routes/routes.constant";
const Cart = () => {
  const { user_id } = useParams<{ user_id: string }>();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  !token && navigate(NAVIGATION_ROUTES.LOGIN);
  !userId && navigate(NAVIGATION_ROUTES.LOGIN);

  const { data: cartData } = useApiCall<cartType[]>(
    cartApiUrl + "user/" + user_id
  );
  const localStorageCart: string | null = localStorage.getItem("cart");
  let cartJson = null;
  if (localStorageCart) {
    cartJson = JSON.parse(localStorageCart);
  }
  return (
    <div className="w-[80%] mx-auto py-4">
      <Typography content="Cart" variant="h2" />

      {cartData &&
        cartData.map((item: cartType) => {
          return (
            <Card
              key={item.id}
              id={item.id}
              userId={item.userId}
              date={item.date}
              products={item.products}
              productId={""}
            />
          );
        })}
      {cartJson?.products ? (
        cartJson?.products.map((item: cartType) => {
          return (
            <Card
              key={item.id}
              id={item?.productId}
              userId={cartJson.userId}
              date={cartJson.date}
              products={[item]}
              productId={""}
            />
          );
        })
      ) : (
        <Typography content="No products in the cart." variant="h2" />
      )}
    </div>
  );
};

export default Cart;
