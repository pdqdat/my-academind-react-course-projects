import { useIsFetching } from "@tanstack/react-query";
import { Link } from "react-router-dom";

export default function Header({ children }) {
    const fetching = useIsFetching();

    return (
        <>
            <div id="main-header-loading">{fetching > 0 && <progress />}</div>
            <header id="main-header">
                <div id="header-title">
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <h1>React Events</h1>
                    </Link>
                </div>
                <nav>{children}</nav>
            </header>
        </>
    );
}
