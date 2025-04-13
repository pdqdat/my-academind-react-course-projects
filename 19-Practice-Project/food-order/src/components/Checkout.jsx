import { useContext, useActionState } from "react";

// Components
import Modal from "./ui/Modal.jsx";
import Input from "./ui/Input.jsx";
import Button from "./ui/Button.jsx";
import Error from "./Error.jsx";

// Context
import CartContext from "../store/CartContext.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";

// Utils
import { currencyFormatter } from "../utils/formatting.js";

// Custom hook
import useHttp from "../hooks/useHttp.js";

const requestConfig = { method: "POST", headers: { "Content-Type": "application/json" } };

export default function Checkout() {
    const cartContext = useContext(CartContext);
    const userProgressContext = useContext(UserProgressContext);

    const {
        data,
        // isLoading: isSending,
        error,
        sendRequest,
        clearData,
    } = useHttp("http://localhost:3000/orders", requestConfig);

    const cartTotal = cartContext.items.reduce((totalPrice, item) => totalPrice + item.price * item.quantity, 0);

    function handleClose() {
        userProgressContext.hideCheckout();
    }

    function handleFinish() {
        userProgressContext.hideCheckout();
        cartContext.clearCart();
        clearData();
    }

    async function checkoutAction(prevState, formData) {
        const customerData = Object.fromEntries(formData.entries());

        await sendRequest(
            JSON.stringify({
                order: {
                    items: cartContext.items,
                    customer: customerData,
                },
            })
        );
    }

    const [state, formAction, isSending] = useActionState(checkoutAction, null);

    let actions = (
        <>
            <Button type="button" textOnly onClick={handleClose}>
                Close
            </Button>

            <Button>Submit Order</Button>
        </>
    );

    if (isSending) {
        actions = <span>Sending order data...</span>;
    }

    if (data && !error) {
        return (
            <Modal open={userProgressContext.progress === "checkout"} onClose={handleClose}>
                <h2>Success!</h2>
                <p>Your order was submitted successfully.</p>
                <p>We'll get back to you with more details via email.</p>

                <p className="modal-actions">
                    <Button onClick={handleFinish}>Okay</Button>
                </p>
            </Modal>
        );
    }

    return (
        <Modal open={userProgressContext.progress === "checkout"} onClose={handleClose}>
            <form action={formAction}>
                <h2>Checkout</h2>
                <p>Total amount: {currencyFormatter.format(cartTotal)}</p>

                <Input label="Full name" type="text" id="name" />
                <Input label="Email address" type="email" id="email" />
                <Input label="Street" type="text" id="street" />

                <div className="control-row">
                    <Input label="Postal code" type="text" id="postal-code" />
                    <Input label="City" type="text" id="city" />
                </div>

                {error && <Error title="Failed to submit order" message={error} />}

                <p className="modal-actions">{actions}</p>
            </form>
        </Modal>
    );
}
