import { useAccordionContext } from "./Accordion";
import { useAccordionItemContext } from "./AccordionItem";

const AccordionContent = ({ className, children }) => {
    const { openItemId } = useAccordionContext();
    const { id } = useAccordionItemContext();

    const isOpen = openItemId === id;

    return <div className={`${className ?? ""} ${isOpen ? "open" : "close"}`}>{children}</div>;
};

export default AccordionContent;
