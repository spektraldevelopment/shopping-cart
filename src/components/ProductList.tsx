import { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../provider/useCart";
import { Product } from "../types/types";
import "./product-list.scss";

const ProductList = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const { addToCart } = useCart();

    useEffect(() => {

        console.log("Fetching products from server...");

        axios.get("http://localhost:3333/api/products").then(res => {

            setProducts(res.data);
            // Set products in local storage
            localStorage.setItem("products", JSON.stringify(res.data));

            console.log("Products fetched from server");
        }).catch(err => {

            // Fallback to local storage if server fails
            const saved = localStorage.getItem("products");
            if (saved) {
                setProducts(JSON.parse(saved));
                console.log("Products loaded from local storage");
            } else {
                console.error("Failed to load products from server and local storage is empty", err);
            }

            console.error("Failed to fetch products from server", err);
        });

    }, []);

    return (
        <div>
            <ul className="product-list">
                {products.map(product => (
                    <li className="product-item" key={product.id}>
                        <img src={product.pic} />
                        <div className="product-item__name-price">
                            <h3>{product.name}</h3>
                            <p>${product.price}</p>
                        </div>
                        <button onClick={() => addToCart(product)}>Add to Cart</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProductList;

