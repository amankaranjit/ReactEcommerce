import { useState, useEffect } from "react";
import InputField from "../../InputField";
import { useParams } from "react-router-dom";
import { usersApiUrl } from "../../../constants/constants";
import useApiCall from "../../../hooks/useApiCall";
import Typography from "../../Typography";
import Button from "../../Button";
import Alert from "../../Alert";
import { UserInitialValues } from "../../../constants/initialValues";
import { userTypes, formData } from "~/src/types/types";
const EditUserForm = () => {
  const { userId } = useParams<{ userId: string }>();
  const { data: user } = useApiCall<userTypes>(usersApiUrl + userId);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(UserInitialValues);
  const [formData, setFormData] = useState<formData>(UserInitialValues);

  console.log(user);
  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email || "",
        username: user.username || "",
        address: {
          city: user.address.city || "",
          street: user.address.street || "",
          zipcode: user.address.zipcode || "",
        },
      });
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name in formData.address) {
      setFormData((formData) => ({
        ...formData,
        address: {
          ...formData.address,
          [name]: value,
        },
      }));
      setErrorMessage((errorMessage) => ({
        ...errorMessage,
        address: {
          ...errorMessage.address,
          [name]: "",
        },
      }));
    } else {
      setFormData({ ...formData, [name]: value });
      setErrorMessage((errorMessage) => ({
        ...errorMessage,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = {
      email: "",
      username: "",
      address: {
        city: "",
        street: "",
        zipcode: "",
      },
    };
    !formData.email && (errors.email = "email is required.");
    !formData.username && (errors.username = "username is required.");
    !formData.address.city && (errors.address.city = "City is required.");
    !formData.address.street && (errors.address.street = "Street is required.");
    !formData.address.zipcode &&
      (errors.address.zipcode = "Zipcode is required.");
    setErrorMessage(errors);
    if (
      formData.email &&
      formData.username &&
      formData.address.city &&
      formData.address.street &&
      formData.address.zipcode
    ) {
      fetch(usersApiUrl + userId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to update user");
          }
          return res.json();
        })
        .then(() => {
          setAlertMessage("User Updated Successfully");
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 3000);
        })
        .catch((err) => {
          setErrorMessage((errorMessage) => ({
            ...errorMessage,
            form: err.message,
          }));
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
            bgColor={"#d1e7dd"}
          />
        )}
        <div className="p-4 border border-gray-200 rounded-md">
          <Typography variant="h2" content="Edit User" />
          <div className="flex w-full gap-10">
            <InputField
              label="email"
              type="text"
              placeHolder="Enter email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              errorMessage={errorMessage.email}
            />
            <InputField
              label="username"
              type="text"
              placeHolder="Enter username"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleChange}
              errorMessage={errorMessage.username}
            />
          </div>
          <div className="flex w-full gap-10">
            <InputField
              label="City"
              type="text"
              placeHolder="Enter city"
              name="city"
              id="city"
              value={formData.address.city}
              onChange={handleChange}
              errorMessage={errorMessage.address.city}
            />
            <InputField
              label="Street"
              type="text"
              placeHolder="Enter street"
              name="street"
              id="street"
              value={formData.address.street}
              onChange={handleChange}
              errorMessage={errorMessage.address.street}
            />
            <InputField
              label="zipcode"
              type="text"
              placeHolder="Enter zipcode"
              name="zipcode"
              id="zipcode"
              value={formData.address.zipcode}
              onChange={handleChange}
              errorMessage={errorMessage.address.zipcode}
            />
          </div>
          <Button text="Update User" type="submit" />
        </div>
      </form>
    </>
  );
};

export default EditUserForm;
