import { useNavigate } from "react-router";

import styles from "./Modal.module.css";

const Modal = ({ children }) => {
    const navigate = useNavigate();

    const closeHandler = () => {
        navigate(-1);
    };

    return (
        <>
            <div className={styles.backdrop} onClick={closeHandler} />
            <dialog open className={styles.modal}>
                {children}
            </dialog>
        </>
    );
};

export default Modal;
