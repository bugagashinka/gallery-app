import React from "react";
import { LightgalleryItem } from "react-lightgallery";

const Thumb = ({ group, file, title, onEdit, onDelete }) => {
  return (
    <li className="collection__thumb">
      <a href="#" className="collection__thumb-link">
        <div className="collection__thumb-content">
          <LightgalleryItem group={group} src={file}>
            <img className="collection__thumb-img" src={file} alt={title} />
            <section className="collection__thumb-more">
              <div className="collection__thumb-title">{title}</div>
              <div className="collection__thumb-controls">
                <button className="button thumb__delete-btn" onClick={onDelete}></button>
                <button className="button thumb__edit-btn" onClick={onEdit}></button>
              </div>
            </section>
          </LightgalleryItem>
        </div>
      </a>
    </li>
  );
};

export default Thumb;
