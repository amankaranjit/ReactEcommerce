type defaultCart = {
  userId: string;
  date: string;
  products: {
    productId: string;
    quantity: number;
  }[];
};
export const addToCart = ({ userId, date, products }: defaultCart) => {
  console.log("Product Added to Cart:", userId, date, products);
};

export const formatDateToYYYYMMDD = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

// Example usage
const orderDate = new Date();
const formattedDate = formatDateToYYYYMMDD(orderDate);
console.log("Formatted Date:", formattedDate);
