import { createContext } from "react";

export type Product = { id: number; name: string; price: number };
export type CartItem = Product & { quantity: number };

export const CartContext = createContext<{
    cart: CartItem[];
    addToCart: (item: Product) => void;
    removeFromCart: (item: Product ) => void;
    checkout: () => void;
} | null>(null);