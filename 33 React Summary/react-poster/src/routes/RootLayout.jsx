import { Outlet } from "react-router";
// import { useState } from "react";

import MainHeader from "../components/MainHeader";

const RootLayout = () => {
    // const [modalIsVisible, setModalIsVisible] = useState(false);

    // const showModalHandler = () => {
    //     setModalIsVisible(true);
    // };

    // const hideModalHandler = () => {
    //     setModalIsVisible(false);
    // };

    return (
        <>
            {/* <MainHeader onCreatePost={showModalHandler} /> */}

            <MainHeader />
            <Outlet />
        </>
    );
};

export default RootLayout;
