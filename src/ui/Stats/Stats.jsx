import React, { useState, useEffect } from "react";
import { bytesToMB } from "utils/convertors";

const Stats = ({ stats, showStorageConfirmDialog }) => {
  const [storageStats, updateStats] = useState(stats);

  useEffect(() => updateStats(stats), [stats]);

  const clearStorageHandler = (e) => {
    e.preventDefault();
    showStorageConfirmDialog();
  };

  const usage = bytesToMB(storageStats.usage).toFixed(2);
  const quota = Math.round(bytesToMB(storageStats.quota));
  const percent = ((usage / quota) * 100).toFixed(2);

  return (
    <section className="panel-stats">
      <a className="panel-stats__clear-link" href="#" onClick={clearStorageHandler}>
        <span className="panel-stats__size">{`${usage}/${quota}MB (${percent}%)`}</span>
        <span className="panel-stats__files">{storageStats.filesCount} files</span>
      </a>
    </section>
  );
};

export default Stats;
