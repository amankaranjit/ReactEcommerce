import { listProps } from "../types/types";

const List = ({ variant = "ul", data }: listProps) => {
  return variant === "ol" ? (
    <ol>
      {data.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ol>
  ) : (
    <ul>
      {data.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
};

export default List;
