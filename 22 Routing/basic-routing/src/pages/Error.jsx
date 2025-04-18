import { Link } from "react-router";

const Error = () => {
    return (
        <main>
            <h1>An error occurred!</h1>
            <p>Could not find this page</p>
            <Link to="/">Go back to Home</Link>
        </main>
    );
};

export default Error;
