"use client";

import { useState } from "react";

import RSCDemo from "@/components/rsc-demo";

export default function ClientDemo({ children }) {
    const [count, setCount] = useState(0);

    console.log("ClientDemo rendered");

    return (
        <div className="client-cmp">
            <h2>A React Client Component</h2>
            <p>
                Will be rendered on the client <strong>AND</strong> the server.
            </p>
            <p>
                <button onClick={() => setCount((prevCount) => prevCount + 1)}>Increase</button>
                <span>{count}</span>
            </p>
            {children}
            {/* Cant use Server Components directly inside Client Components */}
            {/* <RSCDemo /> */}
        </div>
    );
}
