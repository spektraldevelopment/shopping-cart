import { createContext } from "react";
import { CartItem, Product } from "../types/types";

export const CartContext = createContext<{
    cart: CartItem[];
    cartOpen: boolean;
    toggleCart: () => void;
    addToCart: (item: Product) => void;
    removeFromCart: (item: Product ) => void;
    deleteFromCart: (item: Product) => void;
    checkout: () => void;
} | null>(null);