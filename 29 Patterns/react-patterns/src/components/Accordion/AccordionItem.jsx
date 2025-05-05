import { createContext, useContext } from "react";

const AccordionItemContext = createContext();

export const useAccordionItemContext = () => {
    const context = useContext(AccordionItemContext);

    if (!context) {
        throw new Error("useAccordionItemContext must be used within an AccordionItem");
    }

    return context;
};

const AccordionItem = ({ id, children, className }) => {
    return (
        <AccordionItemContext.Provider value={id}>
            <li className={className}>{children}</li>
        </AccordionItemContext.Provider>
    );
};

export default AccordionItem;
