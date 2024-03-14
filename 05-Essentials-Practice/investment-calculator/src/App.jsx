import { useState } from "react";

import Header from "./components/Header.jsx";
import UserInput from "./components/UserInput.jsx";
import Result from "./components/Result.jsx";

function App() {
    const [userInput, setUserInput] = useState({
        initialInvestment: 10000,
        annualInvestment: 1200,
        expectedReturn: 6,
        duration: 10,
    });

    const isValidInput = userInput.duration > 0;

    function handleChange(inputIdentifier, newValue) {
        setUserInput((prevState) => {
            return {
                ...prevState,
                [inputIdentifier]: +newValue,
            };
        });
    }

    return (
        <>
            <Header />
            <UserInput userInput={userInput} handleChange={handleChange} />
            {isValidInput ? <Result input={userInput} /> : <p className="center">Duration should be greater than 0.</p>}
        </>
    );
}

export default App;
