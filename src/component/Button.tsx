import { Link } from "react-router-dom";
import { buttonProps } from "../types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Button = ({
  text,
  variant = "button",
  linkTo = "/",
  className,
  // id,
  icon,
  handleClick,
}: buttonProps) => {
  const buttonClasses = `rounded border-2 py-2 text-sm my-2 text-center text-white bg-black hover:text-black hover:bg-white border-black px-5`;

  if (variant === "link") {
    return (
      <Link to={linkTo} className={buttonClasses}>
        {text}
      </Link>
    );
  }

  return (
    <button className={`${buttonClasses} ${className}`} onClick={handleClick}>
      {text}
      {icon && <FontAwesomeIcon icon={icon} className="ml-2" />}
    </button>
  );
};

export default Button;
