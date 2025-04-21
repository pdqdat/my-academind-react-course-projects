import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";

import Header from "../Header.jsx";
import { fetchEvent, deleteEvent } from "../../util/http.js";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import { queryClient } from "../../util/http.js";
import Modal from "../UI/Modal.jsx";

export default function EventDetails() {
    const [isDeleting, setIsDeleting] = useState(false);

    const { id } = useParams();
    const navigate = useNavigate();

    const { data, isPending, isError, error } = useQuery({
        queryKey: ["events", id],
        queryFn: ({ signal }) => fetchEvent({ id, signal }),
    });

    const formattedDate = new Date(data?.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });

    const {
        mutate,
        isPending: isPendingDelete,
        isError: isErrorDelete,
        error: deleteError,
    } = useMutation({
        mutationFn: deleteEvent,
        onSuccess: () => {
            // Revalidate the events list to ensure it reflects the deletion
            queryClient.invalidateQueries({
                queryKey: ["events"],
                // Prevents automatic refetching of the events list after invalidation.
                // The query will be marked as stale, and refetching will only occur when accessed again.
                refetchType: "none",
            });
            navigate("/events");
        },
    });

    const handleStartDelete = () => {
        setIsDeleting(true);
    };

    const handleStopDelete = () => {
        setIsDeleting(false);
    };

    const handleDelete = () => {
        mutate({ id });
    };

    return (
        <>
            {isDeleting && (
                <Modal onClose={handleStopDelete}>
                    <h2>Are you sure?</h2>
                    <p>Do you really want to delete this event? This action cannot be undone.</p>
                    <div className="form-actions">
                        {isPendingDelete && <p>Deleting, please wait...</p>}
                        {!isPendingDelete && (
                            <>
                                <button className="button-text" onClick={handleStopDelete}>
                                    Cancel
                                </button>
                                <button className="button" onClick={handleDelete}>
                                    Delete
                                </button>
                            </>
                        )}
                    </div>
                    {isErrorDelete && (
                        <ErrorBlock
                            title="An error occurred"
                            message={deleteError.info?.message || "Failed to delete event"}
                        />
                    )}
                </Modal>
            )}
            <Outlet />
            <Header>
                <Link to="/events#all" className="nav-item">
                    View all Events
                </Link>
            </Header>
            {isPending && (
                <div id="event-details-content" className="center">
                    <LoadingIndicator />
                </div>
            )}
            {isError && (
                <ErrorBlock
                    title="failed to load event"
                    message={error.info?.message || "Failed to fetch event data, please try again"}
                />
            )}

            {data && (
                <article id="event-details">
                    <header>
                        <h1>{data.title}</h1>
                        <nav>
                            <button onClick={handleStartDelete}>Delete</button>
                            <Link to="edit">Edit</Link>
                        </nav>
                    </header>
                    <div id="event-details-content">
                        <img src={`http://localhost:3000/${data.image}`} alt={`Image for event ${data.title}`} />
                        <div id="event-details-info">
                            <div>
                                <p id="event-details-location">{data.location}</p>
                                <time dateTime={`${data.date} ${data.time}`}>
                                    {formattedDate} @ {data.time}
                                </time>
                            </div>
                            <p id="event-details-description">{data.description}</p>
                        </div>
                    </div>
                </article>
            )}
        </>
    );
}
