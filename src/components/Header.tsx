import "./header.scss";
import { useCart } from  "../provider/useCart";

const Header: React.FC = () => {

    const { toggleCart } = useCart();

    return(
        <header>
            <h1>My Store</h1>
            <button onClick={toggleCart}>Cart</button>
        </header>
    );
}

export default Header;