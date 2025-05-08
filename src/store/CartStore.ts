import { create } from 'zustand';
import { CartItem, Product } from '../types/types';

const CART_STORAGE_KEY = "shopping_cart";

export interface CartState {
    cart: CartItem[];
    cartOpen: boolean;
    toggleCart: () => void;
    addToCart: (item: Product) => void;
    removeFromCart: (item: Product) => void;
    deleteFromCart: (item: Product) => void;
}

const persistCart = (updatedCart: CartItem[]) => {
    useCartStore.setState({ cart: updatedCart });

    // Persist cart to local storage
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCart));
};

const addToCart = (item: Product) => {
    const { cart } = useCartStore.getState();
    const existing = cart.find(i => i.id === item.id);

    let updatedCart;

    if (existing) {
        updatedCart = cart.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
    } else {
        updatedCart = [...cart, { ...item, quantity: 1 }];
    }

    persistCart(updatedCart);
}

const removeFromCart = (item: Product) => {
    const { cart } = useCartStore.getState();

    const existing = cart.find(i => i.id === item.id);

    let updatedCart: CartItem[] = [];

    if (existing) {
        updatedCart = cart
            .map(i => i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i)
            .filter(i => i.quantity > 0); // Remove items with quantity <= 0
    } else {
        updatedCart = [...cart];
    }

    persistCart(updatedCart);
}

const deleteFromCart = (item: Product) => {
    const updatedCart = useCartStore.getState().cart.filter(i => i.id !== item.id);
    persistCart(updatedCart);
}

const useCartStore = create<CartState>()((set) => ({
    cart: [],
    cartOpen: false,
    toggleCart: () => set((state) => ({ cartOpen: !state.cartOpen })),
    addToCart: (item: Product) => addToCart(item),
    removeFromCart: (item: Product) => removeFromCart(item),
    deleteFromCart: (item:Product) => deleteFromCart(item)
}));

export default useCartStore;