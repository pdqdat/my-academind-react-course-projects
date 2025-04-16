import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { sendCartData, fetchCartData } from "../store/cart-actions";

// A global variable to check if the app is loading for the first time
let isInitial = true;

function App() {
    const cartIsVisible = useSelector((state) => state.ui.cartIsVisible);
    const cart = useSelector((state) => state.cart);
    const notification = useSelector((state) => state.ui.notification);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCartData());
    }, [dispatch]);

    useEffect(() => {
        if (isInitial) {
            isInitial = false;
            return;
        }

        if (cart.isChanged) {
            dispatch(sendCartData(cart));
        }
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

export default App;
