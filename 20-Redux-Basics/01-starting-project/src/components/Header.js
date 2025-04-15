import { useSelector, useDispatch } from "react-redux";

import classes from "./Header.module.css";
import { authActions } from "../store/auth";

const Header = () => {
    const dispatch = useDispatch();

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    return (
        <header className={classes.header}>
            <h1>Redux Auth</h1>
            {isAuthenticated ? (
                <nav>
                    <ul>
                        <li>
                            <a href="/">My Products</a>
                        </li>
                        <li>
                            <a href="/">My Sales</a>
                        </li>
                        <li>
                            <button onClick={() => dispatch(authActions.logout())}>Log out</button>
                        </li>
                    </ul>
                </nav>
            ) : (
                <button onClick={() => dispatch(authActions.login())}>Log in</button>
            )}
        </header>
    );
};

export default Header;
