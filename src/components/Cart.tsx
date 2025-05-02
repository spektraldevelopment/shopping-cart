import "./cart.scss";
import { useCart } from "../provider/useCart";

const Cart: React.FC = () => {

    const { cart, toggleCart, cartOpen } = useCart();

    return(
        <div className={cartOpen ? "cart cart--active" : "cart"}>
            <div className="cart__header">
                <h2>My Cart</h2>
                <button onClick={toggleCart}>Close</button>
            </div>
            <ul>
                {cart.map(product => (
                    <li key={product.id}>
                        <h3>{product.name}</h3>
                        <p>${product.price}</p>
                        <img src={product.pic}/>
                        <p>Quantity: {product.quantity}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Cart;