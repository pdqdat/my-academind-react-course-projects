import { redirect, useRouteLoaderData, Await } from "react-router";
import { Suspense } from "react";

import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";

const EventDetailPage = () => {
    const data = useRouteLoaderData("event-detail");

    return (
        <>
            <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
                <Await resolve={data.event}>{(loadedEvent) => <EventItem event={loadedEvent} />}</Await>
            </Suspense>
            <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
                <Await resolve={data.events}>{(loadedEvents) => <EventsList events={loadedEvents} />}</Await>
            </Suspense>
        </>
    );
};

export default EventDetailPage;

const loadEvent = async (id) => {
    const response = await fetch("http://localhost:8080/events/" + id);

    if (!response.ok) {
        throw new Response("Could not fetch event details", { status: 500 });
    } else {
        const resData = await response.json();
        return resData.event;
    }
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

/**
 * When this loader() is called, React Router passes the request and params objects to it automatically.
 *     - The request object contains information about the incoming request, such as the URL, headers, and method.
 *     - The params object contains any dynamic parameters from the URL, such as the eventID in this case.
 *
 * You can use these parameters to fetch specific data related to the event being requested.
 */
export const loader = async ({ request, params }) => {
    const id = params.eventID;

    return {
        event: await loadEvent(id),
        events: loadEvents(),
    };
};

export const action = async ({ params, request }) => {
    const id = params.eventID;

    const response = await fetch("http://localhost:8080/events/" + id, {
        method: request.method,
    });

    if (!response.ok) {
        throw new Response("Could not delete event", { status: 500 });
    } else {
        return redirect("/events");
    }
};
