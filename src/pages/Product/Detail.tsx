import useApiCall from "../../hooks/useApiCall";
import { useNavigate, useParams } from "react-router-dom";
import DetailCard from "../../component/product/DetailCard";
import Loading from "../../component/Loading";
import { apiUrl } from "../../constants/constants";
import { NAVIGATION_ROUTES } from "../../routes/routes.constant";
import { productTypes } from "../../types/types"; // Ensure this is the correct path to your types
import { useEffect } from "react";
const Detail = () => {
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();
  const { data: product } = useApiCall<productTypes>(`${apiUrl}/${productId}`);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!token && !userId) {
      navigate(NAVIGATION_ROUTES.LOGIN);
    }
  }, [token, userId, navigate]);

  return (
    <div className="w-[80%] mx-auto">
      <div className="flex flex-wrap my-3">
        {product ? (
          <DetailCard
            key={product.id}
            id={product.id}
            price={product.price}
            title={product.title}
            description={product.description}
            category={product.category}
            image={product.image}
            rating={product.rating}
          />
        ) : (
          <Loading content="Data is loading" />
        )}
      </div>
    </div>
  );
};

export default Detail;
