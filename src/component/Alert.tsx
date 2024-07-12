import { alertProps } from "../types/types";

const Alert = ({
  message,
  className,
  isVisible,
  color,
  bgColor,
}: alertProps) => {
  if (!isVisible) {
    return null;
  }

  return (
    <div className={`alert ${className}`} style={{ backgroundColor: bgColor }}>
      <div>
        <span className="font-medium" style={{ color: color }}>
          {message}
        </span>
      </div>
    </div>
  );
};

export default Alert;
