import "./cart.scss";
import { CartItem } from "../types/types";
import { useCart } from "../provider/useCart";
import { resumeScroll } from "../utils/utils";

const Cart: React.FC = () => {

    const { cart, toggleCart, cartOpen, addToCart, removeFromCart, deleteFromCart } = useCart();

    const onToggleCart = () => {
        toggleCart();
        resumeScroll();
    }

    const calculateTotalItem = (product: CartItem) => {

        const { id, name, price, quantity } = product;

        const itemTotal = quantity * price;

        return (
            <li key={id} className="cart-total__list--item">
                <div>{name}({quantity})</div>
                <div>${itemTotal}</div>
            </li>
        )
    };

    const calculateGrandTotal = () => {

        let totalAmount = 0;

        for (const product of cart) {
            console.log("product: ", product)
            const { price, quantity } = product;
            totalAmount += quantity * price;
        }

        return totalAmount;
    }

    return (
        <div className={cartOpen ? "cart cart--active" : "cart"}>
            <div className="cart__header">
                <h2>My Cart</h2>
                <button onClick={onToggleCart}>Close</button>
            </div>
            <div className="cart__content">
                <ul className="cart-list">
                    {cart.map(product => (
                        <li key={product.id} className="cart-list__item">
                            <div className="cart-list__item--header">
                                <h3>{product.name}</h3>
                                <p>${product.price}</p>
                            </div>
                            <img src={product.pic} />
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
                <div className="cart-total">
                    <ul className="cart-total__list">
                        {cart.map(product => calculateTotalItem(product))}
                    </ul>
                    <div className="cart-total__amount">Grand Total: <span>${calculateGrandTotal()}</span></div>
                </div>
            </div>
        </div>
    );
}

export default Cart;