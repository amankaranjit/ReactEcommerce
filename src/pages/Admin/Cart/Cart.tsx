import { useEffect } from "react";
import Card from "../../../component/cart/Card";
import { cartApiUrl } from "../../../constants/constants";
import useApiCall from "../../../hooks/useApiCall";
import { cartType } from "../../../types/types";
import Typography from "../../../component/Typography";
import { useNavigate } from "react-router-dom";
import { NAVIGATION_ROUTES } from "../../../routes/routes.constant";

const Cart = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate(NAVIGATION_ROUTES.LOGIN);
    }
  }, [navigate, token]);

  const { data: cartData } = useApiCall<cartType[]>(cartApiUrl);

  return (
    <div className="w-[80%] mx-auto py-4">
      <Typography content="Cart" variant="h2" />
      {cartData &&
        cartData.map((item: cartType) => (
          <Card
            key={item.id}
            id={item.id}
            userId={item.userId}
            date={item.date}
            products={item.products}
            productId={""} // Assuming this is where you pass product id if needed
          />
        ))}
    </div>
  );
};

export default Cart;
