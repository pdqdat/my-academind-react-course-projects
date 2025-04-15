import { useSelector, useDispatch } from "react-redux";

import classes from "./Counter.module.css";
import { counterActions } from "../store/counter";

const Counter = () => {
    const dispatch = useDispatch();

    // When using useSelector, redux will automatically subscribe to the store
    // and re-render the component when the state changes.
    const counter = useSelector((state) => state.counter.counter);
    const showCounter = useSelector((state) => state.counter.showCounter);

    const incrementHandler = () => {
        dispatch(counterActions.increment());
    };
    const decrementHandler = () => {
        dispatch(counterActions.decrement());
    };

    const toggleCounterHandler = () => {
        dispatch(counterActions.toggleCounter());
    };

    //* Action with payload
    const increaseHandler = () => {
        dispatch(counterActions.increase(5));
    };

    return (
        <main className={classes.counter}>
            <h1>Redux Counter</h1>
            <button onClick={toggleCounterHandler}>Toggle Counter</button>
            {showCounter && <div className={classes.value}>{counter}</div>}
            <div>
                <button onClick={incrementHandler}>Increment</button>
                <button onClick={increaseHandler}>Increase by 5</button>
                <button onClick={decrementHandler}>Decrement</button>
            </div>
        </main>
    );
};

export default Counter;
