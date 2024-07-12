import { useNavigate } from "react-router-dom";
import Button from "../../component/Button";
import Typography from "../../component/Typography";
import { NAVIGATION_ROUTES } from "../../routes/routes.constant";
const AdminDashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  !token && navigate(NAVIGATION_ROUTES.LOGIN);

  return (
    <div className="flex my-3 border border-gray-100 w-[80%] mx-auto justify-between items-center p-4">
      <Typography variant="h2" content="Admin Dashboard" />
      <div className="flex items-center justify-between">
        <Button
          text="View All Product"
          className="ml-2"
          handleClick={() => navigate(NAVIGATION_ROUTES.VIEW_PRODUCTS)}
        />
        <Button
          text="View All Users"
          className="ml-2"
          handleClick={() => navigate(NAVIGATION_ROUTES.VIEW_USERS)}
        />
        <Button
          text="View All Orders"
          className="ml-2"
          handleClick={() => navigate(NAVIGATION_ROUTES.CART)}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
