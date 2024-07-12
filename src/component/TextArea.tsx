import { textAreaProps } from "../types/types";
const TextArea = ({ label, name, id, value, onChange }: textAreaProps) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <textarea
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        className="block w-full p-2 mb-3 border border-gray-300 rounded"
      />
    </>
  );
};

export default TextArea;
