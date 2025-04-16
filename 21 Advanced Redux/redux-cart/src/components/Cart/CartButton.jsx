import { useDispatch, useSelector } from "react-redux";

import { uiActions } from "../../../store/ui-slice";
import classes from "./CartButton.module.css";

const CartButton = (props) => {
    const dispatch = useDispatch();

    const totalQuantity = useSelector((state) => state.cart.totalQuantity);

    return (
        <button className={classes.button} onClick={() => dispatch(uiActions.toggle())}>
            <span>My Cart</span>
            <span className={classes.badge}>{totalQuantity}</span>
        </button>
    );
};

export default CartButton;
