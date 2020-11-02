import React, { useState } from "react";
import Thumb from "ui/Thumb";
import { LightgalleryProvider } from "react-lightgallery";

const Main = ({
  currentColl = "",
  images = [],
  query = "",
  updateFileData,
  showFileConfirmDialog,
  selectFile,
  downloadCollectionArchive,
}) => {
  const [isCaptionVisible, toggleCaption] = useState(false);
  const [currentSlideDescriptor, setSlideDescriptor] = useState(null);

  const onEditHandler = (descriptor) => (e) => {
    updateFileData(descriptor);
    e.stopPropagation();
  };

  const onDeleteHandler = (descriptor) => (e) => {
    selectFile(descriptor);
    showFileConfirmDialog();
    e.stopPropagation();
  };

  const OnDownloadHandler = () => downloadCollectionArchive();

  const thumbElements = images.map(({ file, title }, idx) => {
    const fileDescriptor = images[idx];
    return (
      <Thumb
        key={idx}
        group="group"
        file={file}
        title={title}
        onEdit={onEditHandler(fileDescriptor)}
        onDelete={onDeleteHandler(fileDescriptor)}
      />
    );
  });

  const showCaptionElement = () => {
    if (!isCaptionVisible) return;
    const { title, format, dimensions, type, size, tags, description } = currentSlideDescriptor;
    const [width, height] = dimensions;
    return (
      <section className="collection-caption lg-sub-html">
        <h4>{title}</h4>
        <p>
          <span className="collection-caption__label">Format:</span> {format}
        </p>
        <p>
          <span className="collection-caption__label">File size:</span> {size.toFixed(2)} MB
        </p>
        <p>
          <span className="collection-caption__label">Dimensions:</span> {`${width}x${height}`}
        </p>
        <p>
          <span className="collection-caption__label">Type:</span> {type}
        </p>
        <p>
          <span className="collection-caption__label">Tags:</span> {tags.join(",")}
        </p>
        <p>
          <span className="collection-caption__label" style={{ display: "block" }}>
            Description:
          </span>
          {description}
        </p>
      </section>
    );
  };

  const collectionTitle = query ? `Related to: ${query}` : currentColl;

  return (
    <LightgalleryProvider
      lightgallerySettings={{ thumbnail: false, dynamic: true, dynamicEl: images }}
      onAfterOpen={() => {
        toggleCaption(true);
      }}
      onCloseAfter={() => {
        toggleCaption(false);
      }}
      onAfterSlide={({ detail }) => {
        if (images.length) {
          setSlideDescriptor(images[detail.index]);
        }
      }}
    >
      <section className="content">
        <article className="collection">
          <header className="collection__header">
            <h3 className="title collection-title">{collectionTitle}</h3>
            <span className="collection__stats">{`(${images.length} images)`}</span>
            <button className="button collection-download__btn" onClick={OnDownloadHandler}>
              <span className="collection-download__icon">s</span>
            </button>
          </header>
          <ul className="collection__list">{thumbElements}</ul>
          {showCaptionElement()}
        </article>
      </section>
    </LightgalleryProvider>
  );
};

export default Main;
