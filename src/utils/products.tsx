export const calculatePrice = (price: string, productCount: number) => {
  return (parseFloat(price) * productCount).toFixed(2);
};
