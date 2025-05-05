import { createContext, useContext, useState } from "react";

import AccordionItem from "./AccordionItem";
import AccordionTitle from "./AccordionTitle";
import AccordionContent from "./AccordionContent";

const AccordionContext = createContext();

export const useAccordionContext = () => {
    const ctx = useContext(AccordionContext);

    if (!ctx) {
        throw new Error("Accordion-related components must be used within an Accordion component.");
    }

    return ctx;
};

const Accordion = ({ children, className }) => {
    const [openItemId, setOpenItemId] = useState();

    const toggleItem = (id) => {
        setOpenItemId((prevId) => (prevId === id ? null : id));
    };

    const contextValue = {
        openItemId,
        toggleItem,
    };

    return (
        <AccordionContext.Provider value={contextValue}>
            <ul className={className}>{children}</ul>
        </AccordionContext.Provider>
    );
};

Accordion.Item = AccordionItem;
Accordion.Title = AccordionTitle;
Accordion.Content = AccordionContent;

export default Accordion;
