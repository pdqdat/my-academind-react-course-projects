// Custom hooks
import { useInput } from "../hooks/useInput.js";

// Components
import Input from "./Input.jsx";

// Utils
import { isEmail, isNotEmpty, hasMinLength } from "../util/validation.js";

export default function Login() {
    // const [enteredEmail, setEnteredEmail] = useState("");
    // const [enteredPassword, setEnteredPassword] = useState("");
    const {
        value: emailValue,
        setEnteredValue: setEnteredEmail,
        handleInputChange: handleEmailChange,
        handleInputBlur: handleEmailBlur,
        hasError: emailHasInvalid,
    } = useInput("", (value) => {
        // ...
        return isEmail(value) && isNotEmpty(value);
    });

    const {
        value: passwordValue,
        setEnteredValue: setEnteredPassword,
        handleInputChange: handlePasswordChange,
        handleInputBlur: handlePasswordBlur,
        hasError: passwordHasInvalid,
    } = useInput("", (value) => {
        hasMinLength(value, 6);
    });

    function handleSubmit(event) {
        event.preventDefault();
        console.log("email: " + emailValue);
        console.log("password: " + passwordValue);

        if (emailHasInvalid || passwordHasInvalid) {
            return;
        }

        // Reset the form
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>

            <div className="control-row">
                <Input
                    label="Email"
                    id="email"
                    type="email"
                    name="email"
                    value={emailValue}
                    onBlur={handleEmailBlur}
                    onChange={handleEmailChange}
                    error={emailHasInvalid && "Please enter a valid email."}
                />

                <Input
                    label="Password"
                    id="password"
                    type="password"
                    name="password"
                    value={passwordValue}
                    onBlur={handlePasswordBlur}
                    onChange={handlePasswordChange}
                    error={passwordHasInvalid && "Password must be at least 6 characters."}
                />
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
