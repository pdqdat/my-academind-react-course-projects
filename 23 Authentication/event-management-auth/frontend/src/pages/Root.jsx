import { Outlet, useRouteLoaderData, useSubmit } from "react-router";

import MainNavigation from "../components/MainNavigation";
import { useEffect } from "react";
import { getTokenDuration } from "../util/auth";

function RootLayout() {
    const token = useRouteLoaderData("root");
    const submit = useSubmit();

    // If the user is logged in, which means the token is not null, log out after 1 hour
    useEffect(() => {
        if (!token) {
            return;
        }

        if (token === "EXPIRED") {
            submit(null, {
                action: "/logout",
                method: "POST",
            });
            return;
        }

        const tokenDuration = getTokenDuration();

        setTimeout(() => {
            submit(null, {
                action: "/logout",
                method: "POST",
            });
        }, tokenDuration);
    }, [token, submit]);

    return (
        <>
            <MainNavigation />
            <main>
                {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
                <Outlet />
            </main>
        </>
    );
}

export default RootLayout;
