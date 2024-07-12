import { ErrorProps } from "../types/types";
const Error = ({ content }: ErrorProps) => {
  return <span className="text-red-700">{content}</span>;
};

export default Error;
