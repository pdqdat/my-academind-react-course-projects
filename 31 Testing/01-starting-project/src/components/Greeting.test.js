import { render, screen } from "@testing-library/react";

import Greeting from "./Greeting";

describe("Greeting component", () => {
    test("renders Hello World as a text", () => {
        // Arrange
        render(<Greeting />);

        // Act
        // ...nothing to do here for this test

        // Assert
        const helloWorldElement = screen.getByText("Hello World", { exact: false });
        expect(helloWorldElement).toBeInTheDocument();
    });
});
