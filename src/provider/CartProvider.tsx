import axios from "axios";
import React, { useState, useEffect } from "react";
import { CartItem, Product } from "../types/types";
import { CartContext } from "./CartContext";

const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [cart, setCart] = useState<CartItem[]>([]);
    const [cartOpen, setCartOpen] = useState<boolean>(false);

    useEffect(() => {
        const loadCart = async () => {
            try {
                const res = await axios.get<CartItem[]>("http://localhost:3333/api/cart");
                setCart(res.data);
            } catch (err) {
                console.error("Failed to load cart from server", err)
            }
        }
        loadCart();
    }, []);

    const toggleCart = () => setCartOpen(prev => !prev);

    const addToCart = async (item: Product) => {
        const existing = cart.find(i => i.id === item.id);

        let updatedCart;

        if (existing) {
            updatedCart = cart.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
        } else {
            updatedCart = [...cart, { ...item, quantity: 1 }];
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
        console.log("Remove from cart: ", item)
    }

    const checkout = () => {
        console.log("Checkout");
    }

    return (
        <CartContext.Provider value={{ cart, cartOpen, toggleCart, addToCart, removeFromCart, checkout }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;