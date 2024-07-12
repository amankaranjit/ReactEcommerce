import { cartType } from "../../types/types";
import { apiUrl, cartApiUrl, usersApiUrl } from "../../constants/constants";
import useApiCall from "../../hooks/useApiCall";
import { userTypes, productTypes } from "../../types/types";
import Typography from "../Typography";
import Button from "../../component/Button";
import { faPencilSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Alert from "../Alert";
import { colors } from "../../constants/constants";
import { color } from "@chakra-ui/react";
const Card = ({ id, userId, date, products }: cartType) => {
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const { data: productData } = useApiCall<productTypes[]>(apiUrl);
  const { data: userData } = useApiCall<userTypes[]>(usersApiUrl);
  const [localProducts, setLocalProducts] = useState(products);
  const user = userData?.find((user: userTypes) => user.id === userId);

  const productPrice = (prodPrice: string, prodQuantity: string) => {
    const totalPrice = Number(prodPrice) * Number(prodQuantity);
    return "Rs." + totalPrice.toString();
  };

  const handleDelete = (productId: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      localStorage.removeItem("cart");
      fetch(`${cartApiUrl}/${productId}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to delete product.");
          }
          return res.json();
        })
        .then(() => {
          setLocalProducts(
            localProducts.filter((product) => product.productId !== productId)
          );
          setShowAlert(true);
          setErrorMessage("");
          setAlertMessage("Product deleted successfully");
          setTimeout(() => {
            setShowAlert(false);
          }, 3000);
        })
        .catch((err) => {
          console.error("Error:", err);
        });
    }
  };

  return (
    <div key={id}>
      {showAlert && (
        <Alert
          isVisible={true}
          message={errorMessage ? errorMessage : alertMessage}
          color={errorMessage ? colors.redText : colors.greenText}
          bgColor={errorMessage ? colors.redBackground : colors.greenBackground}
        />
      )}
      {localProducts.map((product) => {
        const productDetail = productData?.find(
          (p: any) => p.id === product.productId
        );
        return (
          <div key={product.productId}>
            {productDetail && (
              <div className="relative flex gap-10 p-3 border border-slate-300">
                <div>
                  <figure className="w-[100px] h-[130px]">
                    <img
                      src={productDetail.image}
                      alt="Image"
                      className="w-full h-full p-5 hover:scale-110"
                    />
                  </figure>
                </div>
                <div className="w-[500px]">
                  <Typography content={productDetail.title} variant="h2" />
                  <Typography
                    content={`Total Quantity: ${product.quantity}`}
                    className="mb-[5px] font-medium"
                  />
                  <Typography
                    content={productPrice(
                      productDetail.price,
                      product.quantity.toString()
                    )}
                    className="mb-[5px] font-semiBold"
                  />
                  <Typography
                    content={`Order Date: ${date}`}
                    variant="h2"
                    className="mb-[0px] font-semiBold"
                  />
                  <span className="text-[10px] absolute right-1 top-1 my-2 inline-block rounded bg-gray-900 text-white px-2 py-1 capitalize">
                    {productDetail.category}
                  </span>
                </div>
                <div className="card">
                  {user && (
                    <>
                      <Typography
                        content={`User's Email: ${user.email}`}
                        variant="h2"
                      />
                      <Typography
                        content={`User's Address: ${user.address.street} ${user.address.city} ${user.address.zipcode}`}
                        variant="p"
                        className="mb-[0px] font-medium"
                      />
                    </>
                  )}
                  <div className="mt-4">
                    <Button
                      className="ml-0"
                      icon={faPencilSquare}
                      handleClick={() => console.log("Edit button clicked")}
                    />
                    <Button
                      className="ml-2"
                      icon={faTrash}
                      handleClick={() => handleDelete(product.productId)}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Card;
