import { createPortal } from "react-dom";
import { motion } from "motion/react";

export default function Modal({ title, children, onClose }) {
    // const hiddenAnimationState = {
    //     opacity: 0,
    //     y: -30,
    // };

    return createPortal(
        <>
            <div className="backdrop" onClick={onClose} />
            <motion.dialog
                open
                className="modal"
                variants={{
                    hidden: {
                        opacity: 0,
                        y: -30,
                    },
                    visible: {
                        opacity: 1,
                        y: 0,
                    },
                }}
                initial="hidden"
                animate="visible"
                exit="hidden"
            >
                <h2>{title}</h2>
                {children}
            </motion.dialog>
        </>,
        document.getElementById("modal")
    );
}
