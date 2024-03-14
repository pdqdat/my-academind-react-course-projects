export default function Tabs({
    children,
    buttons,
    // buttonsContainer,
    ButtonContainer = "menu",
}) {
    // const ButtonContainer = buttonsContainer;

    return (
        <>
            <ButtonContainer>{buttons}</ButtonContainer>

            {children}
        </>
    );
}
