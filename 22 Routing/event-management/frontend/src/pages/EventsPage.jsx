import { useLoaderData, Await } from "react-router";
import { Suspense } from "react";

import EventsList from "../components/EventsList";

const EventsPage = () => {
    const data = useLoaderData();

    return (
        <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
            <Await resolve={data.events}>{(loadedEvents) => <EventsList events={loadedEvents} />}</Await>
        </Suspense>
    );
};

const loadEvents = async () => {
    const response = await fetch("http://localhost:8080/events");

    if (!response.ok) {
        console.log("Error fetching events:", response.statusText);
        throw new Response(JSON.stringify({ message: "Could not fetch events." }), {
            status: 500,
        });
    } else {
        const resData = await response.json();
        return resData.events;
    }
};

export const loader = async () => {
    return { events: loadEvents() };
};

export default EventsPage;
