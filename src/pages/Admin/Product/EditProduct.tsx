import { useNavigate } from "react-router-dom";
import EditProductForm from "../../../component/product/admin/EditProductForm";
import { NAVIGATION_ROUTES } from "../../../routes/routes.constant";
const EditProduct = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  !token && navigate(NAVIGATION_ROUTES.LOGIN);
  return (
    <div className=" my-3 border border-gray-100 w-[80%] mx-auto">
      <EditProductForm />
    </div>
  );
};

export default EditProduct;
