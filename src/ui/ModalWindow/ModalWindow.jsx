import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const ModalWindow = ({ isVisible, onClose, container = document.body, children }) => {
  const [contentHolder] = useState(document.createElement("div"));

  useEffect(() => {
    container.appendChild(contentHolder);
    return () => container.removeChild(contentHolder);
  }, []);

  const content = (
    <div className="modal-window">
      <div className="modal-window__content">
        <button className="button close-btn modal-window__close-btn" onClick={onClose} type="button"></button>
        {children}
      </div>
    </div>
  );

  return isVisible && ReactDOM.createPortal(content, contentHolder);
};

export default ModalWindow;
