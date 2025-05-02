export type Product = { id: number; name: string; price: number, pic: string };
export type CartItem = Product & { quantity: number };