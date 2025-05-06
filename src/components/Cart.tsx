import "./cart.scss";
import { useCart } from "../provider/useCart";
import { resumeScroll } from "../utils/utils";

const Cart: React.FC = () => {

    const { cart, toggleCart, cartOpen, addToCart, removeFromCart, deleteFromCart } = useCart();

    const onToggleCart = () => {
        toggleCart();
        resumeScroll();
    }

    return(
        <div className={cartOpen ? "cart cart--active" : "cart"}>
            <div className="cart__header">
                <h2>My Cart</h2>
                <button onClick={onToggleCart}>Close</button>
            </div>
            <ul className="cart-list">
                {cart.map(product => (
                    <li key={product.id} className="cart-list__item">
                        <div className="cart-list__item--header">
                            <h3>{product.name}</h3>
                            <p>${product.price}</p>    
                        </div>
                        <img src={product.pic}/>
                        <div>
                            <p>Quantity: {product.quantity}</p>
                            <div className="cart-list__buttons">
                                <button onClick={() => addToCart(product)}>+</button>
                                <button onClick={() => removeFromCart(product)}>-</button>
                                <button onClick={() => deleteFromCart(product)}>Delete</button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Cart;