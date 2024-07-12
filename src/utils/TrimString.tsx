type Property = {
  trimString?: string;
};

const trimString = ({ trimString }: Property): string => {
  if (trimString && trimString?.length > 30) {
    return trimString.substring(0, 24) + "...";
  }
  return trimString || "";
};

export default trimString;
