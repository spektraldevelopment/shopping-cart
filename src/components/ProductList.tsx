import { useEffect, useState, CSSProperties } from "react";
import axios from "axios";
import { useCart } from "../provider/useCart";
import { Product } from "../types/types";
import { cacheImages } from "../utils/utils";
import { PulseLoader } from "react-spinners";
import "./product-list.scss";

const spinnerOverride: CSSProperties = {
    textAlign: "center"
}

const ProductList = () => {
    const [isLoading, setIsLoading] = useState(true);   
    const [products, setProducts] = useState<Product[]>([]);
    const { addToCart } = useCart();

    useEffect(() => {

        console.log("Fetching products from server...");

        axios.get("http://localhost:3333/api/products").then(res => {

            const picArray = res.data.map((product: Product) => {
                return product.pic;
            });

            // Cache images
            cacheImages(picArray).then(() => {
                console.log("Images cached");
                setIsLoading(false);
            }).catch(err => {
                console.error("Failed to cache images", err);
                setIsLoading(false);
            });

            setProducts(res.data);
            // Set products in local storage
            localStorage.setItem("products", JSON.stringify(res.data));

            console.log("Products fetched from server");
        }).catch(err => {

            // Fallback to local storage if server fails
            const saved = localStorage.getItem("products");
            if (saved) {
                setProducts(JSON.parse(saved));
                setIsLoading(false);
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
                        <div className="product-item__pic">
                            {isLoading ? <div className="product-item__pic--loading"><PulseLoader cssOverride={spinnerOverride} loading={isLoading}/></div> : <img src={product.pic} />}
                        </div>
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

