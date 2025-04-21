import { useQuery } from "@tanstack/react-query";

import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import EventItem from "./EventItem.jsx";
import { fetchEvents } from "../../util/http.js";

const AllEventsSection = () => {
    const queryObj = useQuery({
        queryKey: ["events"],
        queryFn: ({ signal }) => fetchEvents({ signal }),
        staleTime: 5000,
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
        <section className="content-section" id="all">
            <header>
                <h2>All events</h2>
            </header>
            {content}
        </section>
    );
};

export default AllEventsSection;
