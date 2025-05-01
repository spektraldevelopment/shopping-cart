import axios from "axios";
import React, { useState, useEffect } from "react";
import { CartContext, CartItem, Product } from "./CartContext";

const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = async (item: Product) => {
        const existing = cart.find(i => i.id === item.id);

        let updatedCart;

        if (existing) {
            updatedCart = cart.map(i => i.id === item.id ? {...i, quantity: i.quantity + 1 } : i);
        } else {
            updatedCart = [...cart, {...item, quantity: 1 }];
        }

        setCart(updatedCart);

        try {

            const { id, name, price } = item;

            await axios.post("http://localhost:3333/api/cart", {
                id,
                name, 
                price,
                quantity: 1
            });

        } catch (err) {
            console.error("Failed to update cart on server: ", err)
        }
    }

    const removeFromCart = (item: Product) => {

    }

    const checkout = () => {}

    return(
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, checkout}}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;