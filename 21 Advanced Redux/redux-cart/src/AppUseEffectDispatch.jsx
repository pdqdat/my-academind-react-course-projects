import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { uiActions } from "../store/ui-slice";
import Notification from "./components/UI/Notification";

// A global variable to check if the app is loading for the first time
let isInitial = true;

function AppUseEffectDispatch() {
    const cartIsVisible = useSelector((state) => state.ui.cartIsVisible);
    const cart = useSelector((state) => state.cart);
    const notification = useSelector((state) => state.ui.notification);
    const dispatch = useDispatch();

    // This useEffect is used to send the cart data to the firebase database
    // whenever the cart state changes. The PUT method is used to replace the
    // existing cart data with the new cart data.
    useEffect(() => {
        const sendCartData = async () => {
            dispatch(
                uiActions.showNotification({
                    status: "pending",
                    title: "Sending...",
                    message: "Sending cart data!",
                })
            );

            const response = await fetch(
                "https://react-advanced-redux-cart-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json",
                {
                    method: "PUT",
                    body: JSON.stringify(cart),
                }
            );

            if (!response.ok) {
                throw new Error("Sending cart data failed.");
            }

            dispatch(
                uiActions.showNotification({
                    status: "success",
                    title: "Success!",
                    message: "Sent cart data successfully!",
                })
            );
        };

        // If isInitial is true, meaning that the app is loading for the first time,
        // don't send the cart data to the firebase database.
        if (isInitial) {
            isInitial = false;
            return;
        }

        sendCartData().catch((error) => {
            console.log(error);
            dispatch(
                uiActions.showNotification({
                    status: "error",
                    title: "Error!",
                    message: "Sending cart data failed!",
                })
            );
        });
    }, [cart, dispatch]);

    return (
        <>
            {notification && (
                <Notification status={notification.status} title={notification.title} message={notification.message} />
            )}
            <Layout>
                {cartIsVisible && <Cart />}
                <Products />
            </Layout>
        </>
    );
}

export default AppUseEffectDispatch;
