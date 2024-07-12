import { useNavigate } from "react-router-dom";
import Product from "../Product/Product";
import { NAVIGATION_ROUTES } from "../../routes/routes.constant";
const Dashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  !token && navigate(NAVIGATION_ROUTES.LOGIN);
  return (
    <div className="w-[80%] mx-auto">
      <Product />
    </div>
  );
};

export default Dashboard;
