import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let cart: { id: number; name: string; price: number; pic: string; quantity: number }[] = [];

app.get("/", (req, res) => {
    res.send("API is running");
});

app.get("/api/products", (req, res) => {
    res.json([
        { id: 1, name: "Shoes", price: 50, pic: "https://picsum.photos/seed/1/300/200" },
        { id: 2, name: "Hat", price: 20, pic: "https://picsum.photos/seed/2/300/200" },
        { id: 3, name: "Jacket", price: 75, pic: "https://picsum.photos/seed/3/300/200" }
    ]);
});

app.post("/api/cart", (req, res) => {
    const item = req.body;
    const existing = cart.find(i => i.id === item.id);
    if (existing) {
        existing.quantity += item.quantity;
    } else {
        cart.push({ ...item });
    }
    res.json(cart);
});

app.get("/api/cart", (req, res) => {
    if (res) {
        res.json(cart);
    }
});

app.patch("/api/cart/:id", (req, res) => {
    const item = req.body;
    const existing = cart.find(i => i.id === item.id);

    if (existing && existing.quantity > 1) {
        existing.quantity += item.quantity;
    } else {
        cart = cart.filter(i => i.id !== item.id);
    }
    res.json(cart);
});

app.delete("/api/cart/:id", (req, res) => {
    const id = parseInt(req.params.id);
    cart = cart.filter(i => i.id !== id);
    res.json(cart);
});

app.post("/api/checkout", (req, res) => {
    cart = [];
    if (res) {
        res.json({ message: "Order placed successfully!" });
    }
});

app.listen(3333, () => console.log("Server running on http://localhost:3333"));