"use client";

import React, {useCallback, useEffect} from "react";
import ReactDOM from "react-dom";

const ModalNew = ({ onClose, children, title }) => {
    // create ref for the StyledModalWrapper component
    const modalWrapperRef = React.useRef();

    // check if the user has clicked inside or outside the modal
    // useCallback is used to store the function reference, so that on modal closure, the correct callback can be cleaned in window.removeEventListener
    const backDropHandler = useCallback(e => {
        if (!modalWrapperRef?.current?.contains(e.target)) {
            onClose();
        }
    }, []);

    useEffect(() => {
        // We wrap it inside setTimeout in order to prevent the eventListener to be attached before the modal is open.
        setTimeout(() => {
            window.addEventListener('click', backDropHandler);
        })
    }, [])

    useEffect(() => {
        // remove the event listener when the modal is closed
        return () => window.removeEventListener('click', backDropHandler);
    }, []);

    const handleCloseClick = (e) => {
        e.preventDefault();
        onClose();
    };

    const modalContent = (
        <div className="modal-overlay">
            {/* Wrap the whole ModalNew inside the newly created StyledModalWrapper
            and use the ref */}
            <div ref={modalWrapperRef} className="modal-wrapper">
                <div className="modal">
                    <div className="modal-header">
                        <a href="#" onClick={handleCloseClick}>
                            x
                        </a>
                    </div>
                    {title && <h1>{title}</h1>}
                    <div className="modal-body">{children}</div>
                </div>
            </div>
        </div>
    );

    return ReactDOM.createPortal(
        modalContent,
        document.body,
    );
};

export default ModalNew
