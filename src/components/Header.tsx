import "./header.scss";
import { useCart } from "../provider/useCart";
import { stopScroll } from "../utils/utils";

const Header: React.FC = () => {

    const { toggleCart } = useCart();

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