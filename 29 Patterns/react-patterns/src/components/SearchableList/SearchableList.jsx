import { useRef, useState } from "react";

const SearchableList = ({ items, itemKeyFn, children }) => {
    const lastChange = useRef();

    const [searchTerm, setSearchTerm] = useState("");

    const searchResults = items.filter((item) => JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase()));

    const handleChange = (event) => {
        // If there is a pending timeout, clear it to avoid unnecessary updates
        if (lastChange.current) {
            clearTimeout(lastChange.current);
        }

        // Set a new timeout to delay the search term update by 500ms
        lastChange.current = setTimeout(() => {
            // Clear the timeout reference after it executes
            lastChange.current = null;
            
            // Update the search term state with the input value
            setSearchTerm(event.target.value);
        }, 500);
    };

    return (
        <div className="searchable-list">
            <input type="search" placeholder="Search" onChange={handleChange} />
            <ul>
                {searchResults.map((item) => (
                    <li key={itemKeyFn(item)}>{children(item)}</li>
                ))}
            </ul>
        </div>
    );
};

export default SearchableList;
