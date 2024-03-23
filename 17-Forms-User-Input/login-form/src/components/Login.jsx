import { useRef, useState } from "react";

export default function Login() {
    const [emailIsInvalid, setEmailIsInvalid] = useState(false);

    const email = useRef();
    const password = useRef();

    function handleSubmit(event) {
        event.preventDefault();
        console.log("email: " + email.current.value);
        console.log("password: " + password.current.value);

        // Uncommon way to reset the form
        // email.current.value = "";
        // password.current.value = "";

        const enteredEmail = email.current.value;
        const enteredPassword = password.current.value;
        const emailIsValid = enteredEmail.includes("@");

        if (!emailIsValid) {
            setEmailIsInvalid(true);
            return;
        }

        setEmailIsInvalid(false);

        console.log("sending http request...");
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>

            <div className="control-row">
                <div className="control no-margin">
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" name="email" ref={email} />
                    <div className="control-error">{emailIsInvalid && <p>Please enter a valid email address.</p>}</div>
                </div>

                <div className="control no-margin">
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" name="password" ref={password} />
                </div>
            </div>

            <p className="form-actions">
                <button className="button button-flat">Reset</button>

                <button
                    className="button"
                    //* Alternative way to submit the form
                    // type='button'
                    // onClick={handleSubmit}
                >
                    Login
                </button>
            </p>
        </form>
    );
}
