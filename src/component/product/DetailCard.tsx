import React, { useState } from "react";
import Typography from "../Typography";
import Button from "../Button";
import { productTypes } from "../../types/types";
import { calculatePrice } from "../../utils/products";
import { formatDateToYYYYMMDD } from "../../utils/cart";
import Alert from "../Alert";
import { colors } from "../../constants/constants";
const DetailCard: React.FC<productTypes> = ({
  id,
  price,
  title,
  description,
  category,
  image,
  rating: { rate, count },
}) => {
  const [productCount, setProductCount] = useState(1);
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const userId = localStorage.getItem("userId");
  const incrementProductCount = () => {
    setProductCount((prev) => prev + 1);
  };

  const decrementProductCount = () => {
    if (productCount > 1) {
      setProductCount((prev) => prev - 1);
    }
  };

  const handleAddToCart = (productId: string) => {
    const orderDate = new Date();
    const formattedDate = formatDateToYYYYMMDD(orderDate);
    // Retrieve existing cart from localStorage
    const existingCartJSON = localStorage.getItem("cart");
    let cart = {
      userId: userId,
      date: formattedDate,
      products: [] as { productId: number; quantity: number }[],
    };

    if (existingCartJSON) {
      // Parse existing cart
      cart = JSON.parse(existingCartJSON);
    }

    // Check if product already exists in the cart
    const existingProductIndex = cart.products.findIndex(
      (product) => product.productId === parseInt(productId, 10)
    );

    if (existingProductIndex >= 0) {
      // Update quantity if product exists
      cart.products[existingProductIndex].quantity += parseInt(
        productCount.toString(),
        10
      );
    } else {
      // Add new product to the cart
      cart.products.push({
        productId: parseInt(productId, 10),
        quantity: parseInt(productCount.toString(), 10),
      });
    }

    const cartJSON = JSON.stringify(cart);
    localStorage.setItem("cart", cartJSON);
    setErrorMessage("");
    setShowAlert(true);
    setAlertMessage("Product Added to Cart Successfully");
    setTimeout(() => setShowAlert(false), 1000);
  };

  return (
    <div
      key={id}
      className="flex gap-5 border border-gray-100 p-4 my-4 w-[100%] cursor-pointer"
    >
      {showAlert && (
        <Alert
          isVisible={true}
          message={errorMessage ? errorMessage : alertMessage}
          color={errorMessage ? colors.redText : colors.greenText}
          bgColor={errorMessage ? colors.redBackground : colors.greenBackground}
        />
      )}
      <figure className="w-full mx-auto p-9 relative flex-[40%]">
        <img
          src={image}
          alt="Image"
          className="w-full h-full p-5 hover:scale-110"
        />
        <span className="text-[10px] absolute top-1 right-1 rounded bg-gray-900 text-white px-2 py-1 capitalize">
          {category}
        </span>
      </figure>
      <div className="flex-[60%] bg-slate-50 p-4">
        <div>
          <Typography variant="h2" content={title} className="text-xl" />
          <Typography
            content={`NPR.${calculatePrice(price, productCount)}/-`}
            className="mb-0 text-[22px] font-bold pt-2 text-cyan-800"
          />
          <Typography
            variant="h2"
            content={"" + description}
            className="pt-2 text-lg font-normal"
          />
          <div className="inline-block my-3 border-y-2">
            <button
              className="px-4 py-2 border-x-2"
              onClick={decrementProductCount}
            >
              -
            </button>
            <span className="px-4 py-2 border-none value">{productCount}</span>
            <button
              className="px-4 py-2 border-x-2"
              onClick={incrementProductCount}
            >
              +
            </button>
          </div>
          <span className="block text-sm">
            Rating: {rate} ({count} reviews)
          </span>
        </div>

        <Button
          text="Add to Cart"
          className="w-[200px] py-3 mt-3"
          handleClick={() => handleAddToCart(id)}
        />
      </div>
    </div>
  );
};

export default DetailCard;
