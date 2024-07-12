import { useNavigate } from "react-router-dom";
import EditUserForm from "../../../component/user/admin/EditUserForm";
import { NAVIGATION_ROUTES } from "../../../routes/routes.constant";
const EditUser = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  !token && navigate(NAVIGATION_ROUTES.LOGIN);
  return (
    <div className=" my-3 border border-gray-100 w-[80%] mx-auto">
      <EditUserForm />
    </div>
  );
};

export default EditUser;
