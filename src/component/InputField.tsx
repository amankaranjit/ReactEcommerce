import { inputFieldProps } from "../types/types";
import Error from "./Error";
const InputField = ({
  label,
  type,
  placeHolder,
  name,
  id,
  value,
  onChange,
  errorMessage,
}: inputFieldProps) => {
  return (
    <div className="w-full">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        placeholder={placeHolder}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        className="block w-full p-2 mb-3 border border-gray-300 rounded"
      />
      {errorMessage && <Error content={errorMessage} />}
    </div>
  );
};

export default InputField;
