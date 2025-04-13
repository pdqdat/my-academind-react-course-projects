import { useFormStatus } from "react-dom";

// This component can be used in any form that uses formActions
// to show the submit button and its status.
const Submit = () => {
    const { pending, data, method, action } = useFormStatus();

    return (
        <p className="actions">
            <button type="submit" disabled={pending}>
                {pending ? "Submitting..." : "Submit"}
            </button>
        </p>
    );
};

export default Submit;
