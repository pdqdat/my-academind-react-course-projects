import { Outlet } from "react-router";
import MainNavigation from "../components/MainNavigation";

function RootLayout() {
    return (
        <>
            <MainNavigation />
            <main>
                <Outlet />
            </main>
            <footer
                style={{
                    position: "fixed",
                    bottom: 0,
                    width: "100%",
                    textAlign: "center",
                    marginBottom: "5px",
                }}
            >
                Deployed by{" "}
                <a href="https://datphan.me" target="_blank">
                    datphan.me
                </a>{" "}
                on Firebase Hosting on 18/04/2025
            </footer>
        </>
    );
}

export default RootLayout;
