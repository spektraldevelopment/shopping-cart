import "./header.scss";
import useCartStore from "../store/CartStore";
import { stopScroll } from "../utils/utils";

const Header: React.FC = () => {

    const toggleCart = useCartStore((state) => state.toggleCart);

    const onToggleCart = () => {
        toggleCart();
        stopScroll();
    }

    return (
        <header>
            <h1>My Store</h1>
            <button onClick={onToggleCart}>Cart</button>
        </header>
    );
}

export default Header;