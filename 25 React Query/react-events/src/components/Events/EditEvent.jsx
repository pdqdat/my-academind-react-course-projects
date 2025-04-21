import { Link, redirect, useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";

import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";
import { fetchEvent, updateEvent, queryClient } from "../../util/http.js";
import ErrorBlock from "../UI/ErrorBlock.jsx";

export default function EditEvent() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data, isError, error } = useQuery({
        queryKey: ["events", id],
        queryFn: ({ signal }) => fetchEvent({ id, signal }),
    });

    const { mutate } = useMutation({
        mutationFn: updateEvent,
        // Manipulate the cache to update the event data optimistically
        // before the mutation is completed
        onMutate: async (data) => {
            // The data parameter is THE OBJECT PASSED TO THE MUTATION FUNCTION
            const newEvent = data.event;

            await queryClient.cancelQueries({ queryKey: ["events", id] });

            // Get the current event data from the cache
            const previousEvent = queryClient.getQueryData(["events", id]);

            queryClient.setQueryData(["events", id], newEvent);

            return {
                previousEvent,
            };
        },
        // If the mutation is failed, revert the cache to the previous state
        // The 'context' parameter is the value returned from the onMutate function
        onError: (error, data, context) => {
            queryClient.setQueryData(["events", id], context.previousEvent);
        },
        // After the mutation is completed, invalidate the cache to ensure
        // the data is up to date
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["events", id] });
        },
    });

    function handleSubmit(formData) {
        mutate({ id, event: formData });
        navigate("../");
    }

    function handleClose() {
        navigate("../");
    }

    let content;

    if (isError) {
        content = (
            <>
                <ErrorBlock
                    title="Failed to load event"
                    message={
                        error.info?.message || "Failed to load event. Please check your input and try again later."
                    }
                />
                <div className="form-actions">
                    <Link to="../" className="button">
                        Okay
                    </Link>
                </div>
            </>
        );
    }

    if (data) {
        content = (
            <EventForm inputData={data} onSubmit={handleSubmit}>
                <Link to="../" className="button-text">
                    Cancel
                </Link>
                <button type="submit" className="button">
                    Update
                </button>
            </EventForm>
        );
    }

    return <Modal onClose={handleClose}>{content}</Modal>;
}

export const loader = ({ params }) => {
    return queryClient.fetchQuery({
        queryKey: ["events", params.id],
        queryFn: ({ signal }) => fetchEvent({ id: params.id, signal }),
    });
};

export const action = async ({ request, params }) => {
    const formData = await request.formData();
    const updatedEventData = Object.fromEntries(formData);

    await updateEvent({
        id: params.id,
        event: updatedEventData,
    });
    await queryClient.invalidateQueries({ queryKey: ["events", params.id] });
    
    return redirect("../");
};
