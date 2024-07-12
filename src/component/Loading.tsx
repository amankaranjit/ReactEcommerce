import Typography from "./Typography";
import { loadingProps } from "../types/types";
const Loading = ({ content }: loadingProps) => {
  return <Typography content={content} />;
};

export default Loading;
