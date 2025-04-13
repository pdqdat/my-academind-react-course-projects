import { useActionState, use } from "react";

import { OpinionsContext } from "../store/opinions-context";
import Submit from "./Submit";

export function NewOpinion() {
    const { addOpinion } = use(OpinionsContext);

    async function newOpinionAction(prevState, formData) {
        const userName = formData.get("userName");
        const title = formData.get("title");
        const body = formData.get("body");

        let errors = [];

        if (!userName.trim()) {
            errors.push("User name is required.");
        }
        if (title.trim() < 5) {
            errors.push("Title must be at least 5 characters long.");
        }
        if (body.trim() < 10 || body.trim() > 300) {
            errors.push("Opinion must be between 10 and 300 characters long.");
        }

        if (errors.length > 0) {
            console.log(errors);
            return {
                errors,
                enteredValues: {
                    userName,
                    title,
                    body,
                },
            };
        }

        await addOpinion({
            userName,
            title,
            body,
        });

        return { errors: null };
    }

    const [state, formAction, pending] = useActionState(newOpinionAction, { errors: null });

    return (
        <div id="new-opinion">
            <h2>Share your opinion!</h2>
            <form action={formAction}>
                <div className="control-row">
                    <p className="control">
                        <label htmlFor="userName">Your Name</label>
                        <input type="text" id="userName" name="userName" defaultValue={state.enteredValues?.userName} />
                    </p>

                    <p className="control">
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" name="title" defaultValue={state.enteredValues?.title} />
                    </p>
                </div>
                <p className="control">
                    <label htmlFor="body">Your Opinion</label>
                    <textarea id="body" name="body" rows={5} defaultValue={state.enteredValues?.body}></textarea>
                </p>

                {state.errors && (
                    <ul className="errors">
                        {state.errors.map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                )}

                <Submit />
            </form>
        </div>
    );
}
