import { selectProps } from "../types/types";

const Select = ({
  options,
  onChange,
  value,
  label,
  id,
  name,
  className,
}: selectProps) => {
  return (
    <>
      <div className="block">
        {label && (
          <label htmlFor={id} className="block mb-2">
            {label}:
          </label>
        )}
        <select
          name={name}
          onChange={onChange}
          value={value}
          className={`p-2 my-4 border rounded ${className}`}
        >
          {options?.map((option) => (
            <option key={option.id} value={option.value} id={id}>
              {option.content}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Select;
