import { useQuery } from "@tanstack/react-query";

import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import EventItem from "./EventItem.jsx";
import { fetchEvents } from "../../util/http.js";

export default function NewEventsSection() {
    const queryObj = useQuery({
        queryKey: ["events", { max: 3 }],
        queryFn: ({ signal, queryKey }) => fetchEvents({ signal, ...queryKey[1] }),
        // Stale time (time to keep data fresh)
        // After this time, the data is considered stale and will be refetched
        staleTime: 5000,
        // Garbage collection time (time to keep data in memory)
        // gcTime: 30 * 1000, // 30 seconds
    });
    const { data, isPending, isError, error } = queryObj;

    let content;

    if (isPending) {
        content = <LoadingIndicator />;
    }

    if (isError) {
        content = <ErrorBlock title="An error occurred" message={error.info?.message || "Failed to fetch events"} />;
    }

    if (data) {
        content = (
            <ul className="events-list">
                {data.map((event) => (
                    <li key={event.id}>
                        <EventItem event={event} />
                    </li>
                ))}
            </ul>
        );
    }

    return (
        <section className="content-section" id="new-events-section">
            <header>
                <h2>Recently added events</h2>
            </header>
            {content}
        </section>
    );
}
