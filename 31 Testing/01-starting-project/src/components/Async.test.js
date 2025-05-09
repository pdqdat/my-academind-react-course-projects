import { render, screen } from "@testing-library/react";

import Async from "./Async";

describe("Async component", () => {
    test("renders posts if request succeeds", async () => {
        // Change the implementation of fetch to return a resolved promise with mock data 
        window.fetch = jest.fn();
        window.fetch.mockResolvedValueOnce({
            json: async () => [
                {
                    id: "p1",
                    title: "1st post",
                },
            ],
        });
        render(<Async />);

        const listItemElements = await screen.findAllByRole("listitem");
        expect(listItemElements).not.toHaveLength(0);
    });
});
