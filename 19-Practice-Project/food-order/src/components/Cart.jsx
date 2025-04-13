import { useContext } from "react";

// Components
import Modal from "./ui/Modal.jsx";
import CartItem from "./CartItem.jsx";
import Button from "./ui/Button.jsx";

// Context
import CartContext from "../store/CartContext.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";

// Utils
import { currencyFormatter } from "../utils/formatting.js";

export default function Cart() {
    const cartContext = useContext(CartContext);
    const userProgressContext = useContext(UserProgressContext);

    const cartTotal = cartContext.items.reduce((totalPrice, item) => totalPrice + item.price * item.quantity, 0);

    function handleCloseCart() {
        userProgressContext.hideCart();
    }

    function handleGoToCheckout() {
        userProgressContext.showCheckout();
    }

    return (
        <Modal
            className="cart"
            open={userProgressContext.progress === "cart"}
            onClose={userProgressContext.progress === "cart" ? handleCloseCart : null}
        >
            <h2>Your Cart</h2>

            <ul>
                {cartContext.items.map((item) => (
                    <CartItem
                        key={item.id}
                        item={item}
                        onIncrease={() => cartContext.addItem(item)}
                        onDecrease={() => cartContext.removeItem(item.id)}
                    />
                ))}
            </ul>

            <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>

            <p className="modal-actions">
                <Button textOnly onClick={handleCloseCart}>
                    Close
                </Button>

                {cartContext.items.length > 0 && <Button onClick={handleGoToCheckout}>Go to Checkout</Button>}
            </p>
        </Modal>
    );
}
