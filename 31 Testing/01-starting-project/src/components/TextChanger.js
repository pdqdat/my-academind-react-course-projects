import { useState } from "react";

const TextChanger = () => {
    const [changedText, setChangedText] = useState(false);

    return (
        <div>
            {/* <p>It's good to see you</p> */}
            {changedText && <p>See you later!</p>}
            {!changedText && <p>It's good to see you</p>}
            <button onClick={() => setChangedText((prevState) => !prevState)}>Okay</button>
        </div>
    );
};

export default TextChanger;
