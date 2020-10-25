import React from "react";

const ErrorDialog = ({ message, onClose, setError }) => {
  const closeHandler = () => {
    onClose();
    setError("");
  };

  return (
    <>
      <p style={{ marginBottom: "25px" }}>{message}</p>
      <button className="button ok-btn" onClick={closeHandler} type="button">
        Ok
      </button>
    </>
  );
};

export default ErrorDialog;
