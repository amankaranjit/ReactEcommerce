import { useState, useEffect, ChangeEvent } from "react";
import Card from "../../../component/user/admin/Card";
import Typography from "../../../component/Typography";
import useApiCall from "../../../hooks/useApiCall";
import { userTypes } from "../../../types/types";
import { useNavigate } from "react-router-dom";
import { usersApiUrl } from "../../../constants/constants";
import Alert from "../../../component/Alert";
import Button from "../../../component/Button";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { limitOptions, sortOptions } from "../../../data/select";
import Select from "../../../component/Select";
import { NAVIGATION_ROUTES } from "../../../routes/routes.constant";
import { colors } from "../../../constants/constants";
const ViewUsers = () => {
  const { data: initialUsers } = useApiCall<userTypes[]>(usersApiUrl);
  const [users, setUsers] = useState<userTypes[]>([]);
  const [selectedLimitOption, setSelectedLimitOption] = useState("all");
  const [selectedSortOption, setSelectedSortOption] = useState("default");
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  !token && navigate(NAVIGATION_ROUTES.LOGIN);
  useEffect(() => {
    if (initialUsers) {
      setUsers(initialUsers);
    }
  }, [initialUsers]);

  useEffect(() => {
    initialUsers && handleSortProducts(selectedSortOption);
  }, [selectedSortOption, initialUsers]);

  const handleLimitSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectedLimitOption(selectedValue);
    if (selectedValue === "all") {
      setUsers(initialUsers || []);
    } else {
      const limit = parseInt(selectedValue, 10);
      setUsers((initialUsers || []).slice(0, limit));
    }
  };

  const handleSortSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedSortOption(e.target.value);
  };

  const handleSortProducts = (sortOption: string) => {
    !initialUsers && "";
    if (initialUsers) {
      const sortedUsers = [...initialUsers];
      if (sortOption === "desc") {
        sortedUsers.sort((a: any, b: any) => b.id - a.id);
      } else if (sortOption === "asc") {
        sortedUsers.sort((a: any, b: any) => a.id - b.id);
      }
      setUsers(sortedUsers);
    }
  };

  const deleteUser = (id: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      fetch(`${usersApiUrl}${id}`, { method: "DELETE" })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to delete user");
          }
          return res.json();
        })
        .then(() => {
          setUsers((prevUsers) =>
            prevUsers.filter((user: userTypes) => user.id != id)
          );
          setShowAlert(true);
          setAlertMessage("User Deleted Successfully");
          setTimeout(() => setShowAlert(false), 3000);
        })
        .catch((error) => {
          setErrorMessage(error.message);
          setShowAlert(true);
          setTimeout(() => setShowAlert(false), 3000);
        });
    }
  };

  return (
    <div className="flex flex-wrap my-3 w-[80%] mx-auto justify-center">
      {showAlert && (
        <Alert
          isVisible={true}
          message={errorMessage ? errorMessage : alertMessage}
          color={errorMessage ? colors.redText : colors.greenText}
          bgColor={errorMessage ? colors.redBackground : colors.greenBackground}
        />
      )}
      <div className="flex items-center justify-between w-full">
        <Typography variant="h2" content="All Users" />
        <div className="flex items-center gap-2">
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
          <Button
            text="Add New User"
            icon={faSquarePlus}
            className="ml-2"
            handleClick={() => navigate(NAVIGATION_ROUTES.ADD_USER)}
          />
        </div>
      </div>
      <div className="flex flex-wrap w-full my-3">
        {users.map((user) => (
          <Card
            key={user.id}
            {...user}
            onDelete={() => deleteUser(user.id.toString())}
            onEdit={() => navigate(`${NAVIGATION_ROUTES.EDIT_USERS}${user.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default ViewUsers;
