import { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../provider/useCart";
import { Product } from "../types/types";
import "./product-list.scss";

const ProductList = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const { addToCart } = useCart();

    useEffect(() => {
        axios.get("http://localhost:3333/api/products").then(res => setProducts(res.data));
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

