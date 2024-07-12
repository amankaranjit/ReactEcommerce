import { ChangeEvent, useEffect, useState } from "react";
import Card from "../../component/product/Card";
import Select from "../../component/Select";
import useApiCall from "../../hooks/useApiCall";
import { limitOptions, sortOptions } from "../../data/select";
import Button from "../../component/Button";
import { productTypes } from "../../types/types";
import { apiUrl } from "../../constants/constants";
import { useNavigate } from "react-router-dom";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { formatDateToYYYYMMDD } from "../../utils/cart";
import Alert from "../../component/Alert";
import { NAVIGATION_ROUTES } from "../../routes/routes.constant";
import { colors } from "../../constants/constants";
const Product = () => {
  const navigate = useNavigate();
  const { data: initialProducts } = useApiCall<productTypes[]>(apiUrl);
  const [filteredProducts, setFilteredProducts] = useState<productTypes[]>([]);
  const [selectedLimitOption, setSelectedLimitOption] = useState("all");
  const [selectedSortOption, setSelectedSortOption] = useState("default");
  const [initialStatus, setInitialStatus] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  !token && navigate(NAVIGATION_ROUTES.LOGIN);

  useEffect(() => {
    if (initialProducts) {
      setFilteredProducts(initialProducts);
      setInitialStatus(true);
    }
  }, [initialProducts]);

  useEffect(() => {
    handleSortProducts(selectedSortOption);
  }, [selectedSortOption]);

  const handleLimitSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectedLimitOption(selectedValue);
    console.log("Selected limit value:", selectedValue);
    let updatedProducts = initialProducts || [];
    if (initialStatus && selectedValue !== "all") {
      const limit = parseInt(selectedValue, 10);
      updatedProducts = updatedProducts.slice(0, limit);
    }
    setFilteredProducts(updatedProducts);
  };

  const handleSortSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectedSortOption(selectedValue);
  };

  const handleSortProducts = (sortOption: string) => {
    const sortedProducts = [...filteredProducts];
    if (sortOption === "desc") {
      sortedProducts.sort((a: any, b: any) => b.price - a.price);
    } else if (sortOption === "asc") {
      sortedProducts.sort((a: any, b: any) => a.price - b.price);
    } else {
      setFilteredProducts(initialProducts || []);
    }
    setFilteredProducts(sortedProducts);
  };

  const handleLogout = () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const cart = localStorage.getItem("cart");
    token && localStorage.removeItem("token");
    userId && localStorage.removeItem("userId");
    cart && localStorage.removeItem("cart");
    navigate("/login");
  };

  const handleAddToCart = (productId: string, quantity: string) => {
    const orderDate = new Date();
    const formattedDate = formatDateToYYYYMMDD(orderDate);

    const existingCartJSON = localStorage.getItem("cart");
    let cart;

    if (existingCartJSON) {
      // Parse existing cart
      cart = JSON.parse(existingCartJSON);
      // Ensure cart.products is initialized
      if (!cart.products) {
        cart.products = [];
      }
      // Check if product already exists in the cart
      const existingProductIndex = cart.products.findIndex(
        (product: { productId: number }) =>
          product.productId === parseInt(productId, 10)
      );

      if (existingProductIndex >= 0) {
        // Update quantity if product exists
        cart.products[existingProductIndex].quantity += parseInt(quantity, 10);
      } else {
        // Add new product to the cart
        cart.products.push({
          productId: parseInt(productId, 10),
          quantity: parseInt(quantity, 10),
        });
      }
    } else {
      // Create new cart if it doesn't exist
      cart = {
        userId: userId,
        date: formattedDate,
        products: [
          {
            productId: parseInt(productId, 10),
            quantity: parseInt(quantity, 10),
          },
        ],
      };
    }

    // Convert cart object to JSON string
    const cartJSON = JSON.stringify(cart);
    localStorage.setItem("cart", cartJSON);
    setShowAlert(true);
    setErrorMessage("");
    setAlertMessage("Product Added to cart successfully");
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  return (
    <>
      <div className="flex items-center justify-between gap-2">
        {showAlert && (
          <Alert
            isVisible={true}
            message={errorMessage ? errorMessage : alertMessage}
            color={errorMessage ? colors.redText : colors.greenText}
            bgColor={
              errorMessage ? colors.redBackground : colors.greenBackground
            }
          />
        )}
        <div className="flex gap-2">
          <Select
            options={limitOptions}
            onChange={handleLimitSelect}
            value={selectedLimitOption}
            className="inline"
          />
          <Select
            options={sortOptions}
            onChange={handleSortSelect}
            value={selectedSortOption}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="link" text="Admin Panel" linkTo="/dashboard" />
          <Button variant="button" text="Logout" handleClick={handleLogout} />
          <div className="relative">
            <Button
              text=""
              icon={faCartShopping}
              className="m-0 "
              handleClick={() => navigate(`/cart/${userId}`)}
            />
            <span className="w-[30px] h-[30px] flex text-white justify-center p-[4px] rounded-full bg-slate-500 absolute top-[-5px] right-[-15px]">
              1
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap my-3 border border-gray-100">
        {filteredProducts.map((product) => (
          <Card
            key={product.id}
            id={product.id}
            price={product.price}
            title={product.title}
            category={product.category}
            image={product.image}
            rating={product.rating}
            addToCart={() => handleAddToCart(product.id, "1")}
          />
        ))}
      </div>
    </>
  );
};

export default Product;
