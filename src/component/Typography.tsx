import { typographyProps } from "../types/types";
const Typography = ({
  variant = "p",
  content,
  className,
  children,
}: typographyProps) => {
  const Tag = variant || "p";
  const defaultClassNames = {
    h1: "mb-[1.25rem] font-medium  text-xl sm:text-[2rem] md:text-[2rem] lg:text-[3rem] md:leading-[3rem] lg:leading-[4rem]",
    h2: "text-sm font-semibold mb-2",
    h3: "mt-[16px] mb-[6px]",
    p: "mb-[1.25rem] text-sm",
  };

  const combinedClassName = `${defaultClassNames[Tag]} ${
    className || ""
  }`.trim();

  return (
    <Tag className={combinedClassName}>
      {content}
      {children}
    </Tag>
  );
};

export default Typography;
