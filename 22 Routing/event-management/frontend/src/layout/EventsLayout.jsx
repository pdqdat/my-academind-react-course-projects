import { Outlet } from "react-router";

import EventsNavigation from "../components/EventsNavigation";

const EventsLayout = () => {
    return (
        <>
            <EventsNavigation />
            <Outlet />
        </>
    );
};

export default EventsLayout;
