import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Button from "../../Button";
import { userTypes } from "../../../types/types";
import { defaultImageUrl } from "../../../constants/constants";
const Card = ({
  id,
  email,
  username,
  address,
  onEdit,
  onDelete,
}: userTypes) => {
  const { city, number, street, zipcode } = address;
  return (
    <div key={id} className="p-6 border w-[20%] border-slate-100 ">
      <figure className="w-[150px] mx-auto">
        <img src={defaultImageUrl} alt="User" />
      </figure>
      <p className="mb-2">
        <label htmlFor="Email" className="font-semibold">
          Email:
        </label>
        {email}
      </p>
      <p className="mb-2">
        <label htmlFor="username" className="font-semibold">
          Username:
        </label>
        {username}
      </p>
      <p className="mb-2">
        <label htmlFor="address" className="font-semibold">
          Address
          <br />
        </label>
      </p>
      <p className="mb-2">
        <label htmlFor="City" className="font-semibold">
          City:
        </label>
        {city.toLocaleUpperCase()}
      </p>
      <p className="mb-2">
        <label htmlFor="Street" className="font-semibold">
          Street:
        </label>
        {street.toLocaleUpperCase() + number}
      </p>
      <p className="mb-2">
        <label htmlFor="Zipcode" className="font-semibold">
          Zipcode:
        </label>
        {zipcode}
      </p>
      <div>
        {onEdit && (
          <Button
            text="Edit "
            icon={faPenToSquare}
            className="inline-block"
            handleClick={() => onEdit(Number(id))}
          />
        )}
        {onDelete && (
          <Button
            text="Delete "
            icon={faTrashCan}
            className="ml-2"
            handleClick={() => onDelete(Number(id))}
          />
        )}
      </div>
    </div>
  );
};

export default Card;
