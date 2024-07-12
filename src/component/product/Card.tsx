import Typography from "../Typography";
import TrimString from "../../utils/TrimString";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { productTypes } from "../../types/types";
import { NAVIGATION_ROUTES } from "../../routes/routes.constant";
const Card = ({
  id,
  price,
  title,
  category,
  description,
  image,
  rating: { rate, count },
  addToCart,
}: productTypes) => {
  const navigate = useNavigate();
  return (
    <div key={id} className="border border-gray-100 p-2 w-[20%] cursor-pointer">
      <figure
        className="w-full h-[280px] mx-auto p-9 relative"
        onClick={() => navigate(`/product/${id}`)}
      >
        <img
          src={image}
          alt="Image"
          className="w-full h-full p-5 hover:scale-110"
        />
        <span className="text-[10px] absolute top-1 right-1 rounded bg-gray-900 text-white px-2 py-1 capitalize">
          {category}
        </span>
      </figure>
      <div onClick={() => navigate(`${NAVIGATION_ROUTES.PRODUCT}/${id}`)}>
        <Typography
          variant="h2"
          content={TrimString({ trimString: title })}
          className="min-h-[20px]"
        />

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
      </div>
      <Button
        text="Add to Cart"
        className="w-full"
        handleClick={addToCart}
        id={id}
      />
    </div>
  );
};

export default Card;
