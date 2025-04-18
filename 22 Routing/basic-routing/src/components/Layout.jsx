import { Outlet } from "react-router";

import MainNavigation from "./MainNavigation";

const Layout = () => {
    return (
        <>
            <MainNavigation />
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default Layout;
