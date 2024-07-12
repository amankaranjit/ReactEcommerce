import { useState, useEffect } from "react";
import InputField from "../../InputField";
import { useParams } from "react-router-dom";
import { apiUrl } from "../../../constants/constants";
import useApiCall from "../../../hooks/useApiCall";
import Typography from "../../Typography";
import TextArea from "../../TextArea";
import Button from "../../Button";
import Alert from "../../Alert";
import { productTypes } from "~/src/types/types";
import {
  ProductInitialValues,
  ProductErrorInitialValues,
} from "../../../constants/initialValues";

const EditProductForm = () => {
  const { productId } = useParams<{ productId: string }>();
  const { data: product } = useApiCall<productTypes[]>(apiUrl + productId);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(ProductErrorInitialValues);
  const [formData, setFormData] = useState<productTypes>(ProductInitialValues);

  useEffect(() => {
    if (product && product.length > 0) {
      setFormData({
        ...product[0],
      });
    }
  }, [product]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrorMessage((errorMessage) => ({
      ...errorMessage,
      [name]: "",
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = {
      title: "",
      price: "",
      image: "",
      category: "",
    };
    !formData.title && (errors.title = "Title is required.");
    !formData.price && (errors.price = "price is required.");
    !formData.image && (errors.image = "image is required.");
    !formData.category && (errors.category = "category is required.");
    setErrorMessage(errors);
    if (
      formData.title &&
      formData.price &&
      formData.image &&
      formData.category
    ) {
      fetch(apiUrl + productId, {
        method: "PUT",
        body: JSON.stringify({
          title: formData.title,
          price: formData.price,
          description: formData.description,
          image: formData.image,
          category: formData.category,
        }),
      })
        .then((res) => res.json())
        .then(() => {
          setAlertMessage("Product Updated Successfully");
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 3000);
        })
        .catch((err) => {
          setErrorMessage(err.message);
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 3000);
        });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {showAlert && (
          <Alert
            isVisible={showAlert}
            message={alertMessage}
            bgColor="#d1e7dd"
          />
        )}
        <div className="p-4 border border-gray-200 rounded-md">
          <Typography variant="h1" content="Edit Product" />
          <div className="flex w-full gap-10">
            <InputField
              label="Title"
              type="text"
              placeHolder="Enter the product title"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleChange}
              errorMessage={errorMessage.title}
            />
            <InputField
              label="Price"
              type="text"
              placeHolder="Enter the product price"
              name="price"
              id="price"
              value={formData.price}
              onChange={handleChange}
              errorMessage={errorMessage.price}
            />
            <InputField
              label="Category"
              type="text"
              placeHolder="Enter the product category"
              name="category"
              id="category"
              value={formData.category}
              onChange={handleChange}
              errorMessage={errorMessage.category}
            />
          </div>
          <TextArea
            label="Description"
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
          />
          <div className="flex items-start w-full gap-10">
            <InputField
              label="Image URL"
              type="text"
              placeHolder="Enter the product image URL"
              name="image"
              id="image"
              value={formData.image}
              onChange={handleChange}
              errorMessage={errorMessage.image}
            />
            {formData.image && (
              <figure className="w-[10%]">
                <img src={formData.image} alt="Product" />
              </figure>
            )}
          </div>
          <Button text="Update Product" type="submit" />
        </div>
      </form>
    </>
  );
};

export default EditProductForm;
