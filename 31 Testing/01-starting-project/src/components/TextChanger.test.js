import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import TextChanger from "./TextChanger";

describe("TextChanger component", () => {
    test("renders 'Good to see you' if the button was NOT clicked", () => {
        render(<TextChanger />);
        const goodToSeeYouElement = screen.getByText("good to see you", { exact: false });
        expect(goodToSeeYouElement).toBeInTheDocument();
    });

    test("renders 'See you later' if the button WAS clicked", () => {
        // Arrange
        render(<TextChanger />);

        // Act
        const buttonElement = screen.getByRole("button");
        userEvent.click(buttonElement);

        // Assert
        const seeYouLaterElement = screen.getByText("see you later", { exact: false });
        expect(seeYouLaterElement).toBeInTheDocument();
    });

    test("does not render 'Good to see you' if the button WAS clicked", () => {
        render(<TextChanger />);

        const buttonElement = screen.getByRole("button");
        userEvent.click(buttonElement);

        const goodToSeeYouElement = screen.queryByText("good to see you", { exact: false });
        expect(goodToSeeYouElement).toBeNull();
    });
});
