import axios from "axios";
import React, { useState, useEffect } from "react";
import { CartItem, Product } from "../types/types";
import { CartContext } from "./CartContext";

const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [cart, setCart] = useState<CartItem[]>([]);
    const [cartOpen, setCartOpen] = useState<boolean>(true);

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

            const { id, name, price, pic } = item;

            await axios.post("http://localhost:3333/api/cart", {
                id,
                name,
                price,
                pic,
                quantity: 1
            });

        } catch (err) {
            console.error("Failed to update cart on server: ", err)
        }
    }

    const removeFromCart = async (item: Product) => {
        const existing = cart.find(i => i.id === item.id);

        let updatedCart: CartItem[] = [];

        if (existing) {
            updatedCart = cart
                .map(i => i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i)
                .filter(i => i.quantity > 0); // Remove items with quantity <= 0
        } else {
            updatedCart = [...cart];
        }

        setCart(updatedCart);

        try {
            await axios.patch(`http://localhost:3333/api/cart/${item.id}`, {
                id: item.id,
                quantity: -1
            });
        } catch (err) {
            console.error("Failed to update cart on server: ", err)
        }
    }

    const deleteFromCart = async (item: Product) => {
        const updatedCart = cart.filter(i => i.id !== item.id);
        setCart(updatedCart);

        try {
            await axios.delete(`http://localhost:3333/api/cart/${item.id}`);
        } catch (err) {
            console.error("Failed to delete item from server: ", err)
        }
    }

    const checkout = () => {
        console.log("Checkout");
    }

    return (
        <CartContext.Provider value={{ cart, cartOpen, toggleCart, addToCart, removeFromCart, deleteFromCart, checkout }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;