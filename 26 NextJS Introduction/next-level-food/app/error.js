'use client';
// NextJS ensure that the error component catches all errors in the app, including those in the client components.
// That's why the error component must be a client component.

const Error = ({ error }) => {
    return (
        <main className="error">
            <h1>An error occurred!</h1>
            <p>Please try again later.</p>
        </main>
    );
};

export default Error;
