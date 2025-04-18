import { useRouteLoaderData } from "react-router";

import EventForm from "../components/EventForm";

const EditEventPage = () => {
    const data = useRouteLoaderData("event-detail");

    return <EventForm event={data.event} method="patch" />;
};

export default EditEventPage;
