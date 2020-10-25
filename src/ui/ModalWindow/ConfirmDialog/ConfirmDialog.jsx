import React from "react";

const ConfirmDialog = ({ cancelHandler, onDelete, onFullDelete, children, extraQuestion = false }) => {
  return (
    <section className="confirm-dialog">
      {children}
      <div className="confirm-dialog__controls">
        <button className="button confirm-dialog__btn cancel-btn" onClick={cancelHandler} type="button">
          Cancel
        </button>
        <button className="button confirm-dialog__btn ok-btn" onClick={onDelete} type="button">
          Delete
        </button>
        {extraQuestion ? (
          <button className="button confirm-dialog__btn ok-btn" onClick={onFullDelete} type="button">
            Delete with files
          </button>
        ) : null}
      </div>
    </section>
  );
};
export default ConfirmDialog;
