import { ChangeEvent } from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface productTypes {
  id: string;
  price: string;
  title: string;
  category: string;
  description?: string;
  image: string;
  rating: {
    rate: string;
    count: string;
  };
  onDelete?: (id: number) => void;
  onEdit?: (id: number) => void;
  addToCart?: () => void;
}
export interface alertProps {
  message: string;
  className?: string;
  isVisible: boolean;
  color?: string;
  bgColor?: string;
}
export interface buttonProps {
  text?: string;
  variant?: "button" | "link";
  linkTo?: string;
  className?: string;
  id?: string;
  icon?: IconDefinition;
  type?: string | undefined;
  handleClick?: () => void;
}

export interface loadingProps {
  content: string;
}
export interface optionProps {
  id: string;
  value: string;
  content: string;
}

export interface selectProps {
  id?: string;
  name?: string;
  options?: optionProps[];
  label?: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  value: string;
  className?: string;
}
export interface typographyProps {
  variant?: "h1" | "h2" | "h3" | "p";
  content: string;
  className?: string;
  children?: React.ReactNode;
}

export interface listProps {
  variant?: "ul" | "ol";
  data: string[];
}
export interface inputFieldProps {
  label: string;
  type: string;
  placeHolder: string;
  name: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
}

export interface textAreaProps {
  label: string;
  name: string;
  id: string;
  value: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export interface userTypes {
  id: string;
  email: string;
  username: string;
  password?: string;
  address: {
    city: string;
    number: string;
    street: string;
    zipcode: string;
  };
  onDelete?: (id: number) => void;
  onEdit?: (id: number) => void;
}
export interface cartType {
  productId: string;
  id: string;
  userId: string;
  date: string;
  products: Array<{
    productId: string;
    quantity?: number;
  }>;
}

export interface products {
  productId: number;
  quantity: number;
}

export interface cartData {
  userId: number;
  date: string;
  products: products[];
}
export interface formData {
  email: string;
  username: string;
  address: {
    city: string;
    street: string;
    zipcode: string;
  };
}

export interface ErrorProps {
  content: string;
}
