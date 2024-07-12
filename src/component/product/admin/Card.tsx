import Typography from "../../Typography";
import TrimString from "../../../utils/TrimString";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Button from "../../Button";
import { productTypes as CardproductTypes } from "../../../types/types";

const Card = ({
  id,
  price,
  title,
  category,
  description,
  image,
  rating: { rate, count },
  onEdit,
  onDelete,
}: CardproductTypes) => {
  const handleEditClick = () => {
    onEdit && onEdit(Number(id));
  };
  const handleDeleteClick = () => {
    onDelete && onDelete(Number(id));
  };
  return (
    <div
      key={id}
      className="border border-gray-100 p-2 w-[50%] cursor-pointer flex items-center basis-1/2"
    >
      <figure className="w-[240px] h-[250px] p-9 relative">
        <img
          src={image}
          alt="Product"
          className="w-full h-full p-5 hover:scale-110"
        />
        <span className="text-[10px] absolute top-1 left-1 rounded bg-gray-900 text-white px-2 py-1 capitalize">
          {category}
        </span>
      </figure>
      <div>
        <Typography variant="h2" content={title} className="min-h-[20px]" />
        <Typography
          content={TrimString({ trimString: description })}
          className="text-md"
        />
        <Typography
          content={`NPR.${price}/-`}
          className="mb-0 text-[16px] font-semibold"
        />
        <span className="text-sm">
          Rating: {rate} ({count} reviews)
        </span>
        <div>
          {onEdit && (
            <Button
              text="Edit "
              icon={faPenToSquare}
              className="inline-block"
              handleClick={handleEditClick}
            />
          )}
          {onDelete && (
            <Button
              text="Delete "
              icon={faTrashCan}
              className="ml-2"
              handleClick={handleDeleteClick}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;

export type productTypes = {
  id: string;
  price: string;
  title: string;
  category: string;
  description?: string;
  image: string;
  rating: {
    rate: string;
    count: string;
  };
  onDelete?: (id: number) => void;
  onEdit?: (id: number) => void;
};
