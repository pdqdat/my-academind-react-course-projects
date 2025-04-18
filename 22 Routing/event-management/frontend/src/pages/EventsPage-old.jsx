import { useLoaderData } from "react-router";

import EventsList from "../components/EventsList";

//* This loader() is executed in the browser,
//* that means we can use any browser API (like fetch, localStorage, cookies, etc.)
export const loader = async () => {
    const response = await fetch("http://localhost:8080/events");

    if (!response.ok) {
        console.log("Error fetching events:", response.statusText);
        // return {
        //     isError: true,
        //     message: "Could not fetch events.",
        // };

        //* If an error is thrown, React Router will automatically catch it and pass it to the nearest errorElement
        //* (in this case the ErrorPage component in the RootLayout)
        // throw new Error("Could not fetch events.");

        throw new Response(JSON.stringify({ message: "Could not fetch events." }), {
            status: 500,
        });
    } else {
        //* React Router will automatically pass this data to the EventsPage component
        return response;
    }
};

const EventsPage = () => {
    // This will be the data returned from the loader function in the router configuration
    const data = useLoaderData();
    const events = data.events;

    // if (data.isError) {
    //     return (
    //         <div style={{ textAlign: "center" }}>
    //             <p>{data.message}</p>
    //         </div>
    //     );
    // }

    return <EventsList events={events} />;
};

//* The whole fetching process, along with error handling and loading state,
//* is handled by the loader in the router configuration

// const EventsPage = () => {
//     const [isLoading, setIsLoading] = useState(false);
//     const [events, setEvents] = useState();
//     const [error, setError] = useState();
//     useEffect(() => {
//         const fetchEvents = async () => {
//             setIsLoading(true);
//             const response = await fetch("http://localhost:8080/events");
//             if (!response.ok) {
//                 console.log("Error fetching events:", response.statusText);
//                 setError("Fetching events failed.");
//             } else {
//                 const data = await response.json();
//                 setEvents(data.events);
//             }
//             setIsLoading(false);
//         };
//         fetchEvents().catch((error) => {
//             console.error(error.message);
//         });
//     }, []);

//     return (
//         <>
//             <div style={{ textAlign: "center" }}>
//                 {isLoading && <p>Loading...</p>}
//                 {error && <p>{error}</p>}
//             </div>
//             {!isLoading && events && <EventsList events={events} />}
//         </>
//     );
// };

export default EventsPage;
