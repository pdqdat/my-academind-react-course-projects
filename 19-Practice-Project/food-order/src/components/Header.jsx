import { useContext } from "react";

// Context
import CartContext from "../store/CartContext.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";

// Assets
import Logo from "../assets/logo.jpg";

// Components
import Button from "./ui/Button.jsx";

export default function Header() {
    const cartContext = useContext(CartContext);
    const userProgressContext = useContext(UserProgressContext);

    const totalCartItems = cartContext.items.reduce(
        (totalNumberOfItems, item) => totalNumberOfItems + item.quantity,
        0
    );

    function handleShowCart() {
        userProgressContext.showCart();
    }

    return (
        <header id="main-header">
            <div id="title">
                <img src={Logo} alt="DP Restaurant" />
                <h1>DP Food</h1>
            </div>

            <nav>
                <Button textOnly onClick={handleShowCart}>
                    Cart ({totalCartItems})
                </Button>
            </nav>
        </header>
    );
}
