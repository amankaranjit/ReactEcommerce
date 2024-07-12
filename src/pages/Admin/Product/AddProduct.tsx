import AddProductForm from "../../../component/product/admin/AddProductForm";
import { useNavigate } from "react-router-dom";
import { NAVIGATION_ROUTES } from "../../../routes/routes.constant";
const AddProduct = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  !token && navigate(NAVIGATION_ROUTES.LOGIN);
  return (
    <div className=" my-3 border border-gray-100 w-[80%] mx-auto">
      <AddProductForm />
    </div>
  );
};

export default AddProduct;
