import "./App.css";
import Greeting from "./components/Greeting";
import TextChanger from "./components/TextChanger";
import Async from "./components/Async";

function App() {
    return (
        <div className="App">
            <Greeting />
            <TextChanger />
            <Async />
        </div>
    );
}

export default App;
