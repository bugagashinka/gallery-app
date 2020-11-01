import React from "react";
import classNames from "classnames";
import Filter from "containers/Filter";
import Stats from "containers/Stats";

const Panel = ({ showCreateFormDialog }) => {
  const uploadClickHandler = (e) => {
    showCreateFormDialog();
  };

  const uploadButtonStyle = classNames("button", "upload-btn");

  return (
    <aside className="panel">
      <div className="panel__inner">
        <button className={uploadButtonStyle} onClick={uploadClickHandler}>
          Upload
        </button>
        <Stats />
        <Filter />
      </div>
    </aside>
  );
};

export default Panel;
