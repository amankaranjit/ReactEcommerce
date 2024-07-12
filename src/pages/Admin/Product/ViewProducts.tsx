import { useState, useEffect } from "react";
import Card from "../../../component/product/admin/Card";
import Typography from "../../../component/Typography";
import useApiCall from "../../../hooks/useApiCall";
import { productTypes } from "../../../types/types";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../../../constants/constants";
import Alert from "../../../component/Alert";
import Button from "../../../component/Button";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { NAVIGATION_ROUTES } from "../../../routes/routes.constant";
import { colors } from "../../../constants/constants";
const ViewProducts = () => {
  const { data: initialProducts } = useApiCall<productTypes[]>(apiUrl);
  const [products, setProducts] = useState<productTypes[]>([]);
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  !token && navigate(NAVIGATION_ROUTES.LOGIN);
  useEffect(() => {
    if (initialProducts) {
      setProducts(initialProducts);
    }
  }, [initialProducts]);

  const deleteProduct = (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (confirmed) {
      fetch(`${apiUrl}${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then(() => {
          setProducts((prevProducts) =>
            prevProducts.filter((product) => Number(product.id) !== id)
          );
          setShowAlert(true);
          setAlertMessage("Product Deleted Successfully");
          setTimeout(() => {
            setShowAlert(false);
          }, 3000);
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    }
  };

  return (
    <div className="flex flex-wrap my-3 w-[80%] mx-auto">
      {showAlert && (
        <Alert
          isVisible={true}
          message={errorMessage ? errorMessage : alertMessage}
          color={errorMessage ? colors.redText : colors.greenText}
          bgColor={errorMessage ? colors.redBackground : colors.greenBackground}
        />
      )}
      <div className="flex items-center justify-between w-full">
        <Typography variant="h2" content="All Products" />
        <Button
          text="Add New Product"
          icon={faSquarePlus}
          className="ml-2"
          handleClick={() => navigate(`/dashboard/add_product/`)}
        />
      </div>
      <div className="flex flex-wrap my-3 border border-gray-100">
        {products.map((product: productTypes) => (
          <Card
            key={product.id}
            {...product}
            onDelete={() => deleteProduct(Number(product.id))}
            onEdit={() => navigate(`/dashboard/edit_product/${product.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default ViewProducts;
