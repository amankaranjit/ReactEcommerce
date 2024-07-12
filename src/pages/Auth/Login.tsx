import { useState } from "react";
import useApiCall from "../../hooks/useApiCall";
import { usersApiUrl } from "../../constants/constants";
import Typography from "../../component/Typography";
import InputField from "../../component/InputField";
import Button from "../../component/Button";
import { useNavigate } from "react-router-dom";
import { userTypes } from "../../types/types";
import { LoginInitialValues } from "../../constants/initialValues";
import { NAVIGATION_ROUTES } from "../../routes/routes.constant";
const Login = () => {
  const { data: users } = useApiCall<userTypes[]>(usersApiUrl);

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(LoginInitialValues);
  const [formData, setFormData] = useState(LoginInitialValues);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = {
      username: "",
      password: "",
    };
    !formData.username && (errors.username = "Username is required.");
    !formData.password && (errors.password = "Password is required.");
    setErrorMessage(errors);
    if (errors.username || errors.password) {
      return;
    }

    if (users) {
      const matchedUser = users.find(
        (user: userTypes) =>
          user.username === formData.username &&
          user.password === formData.password
      );
      if (matchedUser) {
        localStorage.setItem("userId", matchedUser.id);
        localStorage.setItem("token", "sample-token");
        navigate(NAVIGATION_ROUTES.DASHBOARD);
      } else {
        setErrorMessage((errorMessage) => ({
          ...errorMessage,
          username: "Invalid username or password.",
          password: "Invalid username or password.",
        }));
      }
    }
  };

  return (
    <div className="my-3 border border-gray-100 w-[30%] mx-auto bg-slate-100 p-4">
      <Typography variant="h2" content="Login" className="text-center" />
      <form onSubmit={handleSubmit}>
        <InputField
          label="Username"
          type="text"
          placeHolder="Enter username"
          name="username"
          id="username"
          value={formData.username}
          onChange={handleChange}
          errorMessage={errorMessage.username}
        />
        <InputField
          label="Password"
          type="password"
          placeHolder="Enter password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          errorMessage={errorMessage.password}
        />
        <div className="flex justify-end">
          <Button text="Login" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default Login;
