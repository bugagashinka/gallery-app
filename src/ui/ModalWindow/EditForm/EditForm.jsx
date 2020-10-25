import React, { useState, useEffect } from "react";
import { inputModeEnum, DEFAULT_COLLECTION_NAME2 } from "constants.js";

const acceptFileType = {
  images: "image/*",
};

const EditForm = ({
  mode,
  activeFile,
  collections,
  tags = [],
  activeCollection,
  uploadFile,
  closeHandler,
  addNewTag,
  getTags,
}) => {
  const [fileDescriptor, updateDescriptor] = useState(
    mode === inputModeEnum.CREATE_MODE
      ? {
          title: "",
          file: null,
          collection: "",
          description: "",
          tags: [],
        }
      : activeFile
  );
  const [newTag, setNewTag] = useState("");

  useEffect(() => {
    getTags();
  }, []);

  useEffect(() => {
    updateDescriptor((descriptor) => ({ ...descriptor, collection: activeCollection }));
  }, [activeCollection]);

  const collectionOptions = collections
    .filter(({ title }) => title !== DEFAULT_COLLECTION_NAME2)
    .map(({ title }) => (
      <option key={title} value={title}>
        {title}
      </option>
    ));
  const tagOptions = tags.map((name) => (
    <option key={name} value={name}>
      {name}
    </option>
  ));

  const changeCollection = ({ target }) =>
    updateDescriptor((descriptor) => ({ ...descriptor, collection: target.value }));

  const changeDescription = ({ target }) =>
    updateDescriptor((descriptor) => ({ ...descriptor, description: target.value }));

  const changeTags = ({ target }) => {
    const tags = Array.from(target.options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    updateDescriptor((descriptor) => ({ ...descriptor, tags }));
  };

  const uploadFileHandler = ({ target }) => {
    const [file] = Object.values(target.files);
    updateDescriptor((descriptor) => ({ ...descriptor, title: file.name, file, type: file.type, size: file.size }));
  };

  const fileNameChange = ({ target }) => updateDescriptor((descriptor) => ({ ...descriptor, title: target.value }));

  const onUpload = () => {
    const { title, file } = fileDescriptor;
    if (title && file) {
      uploadFile(fileDescriptor);
      closeHandler();
    }
  };

  const updateTagInput = ({ target }) => {
    const tag = target.value.trim();
    if (!tag.startsWith("#")) {
      setNewTag(`#${tag}`);
      return;
    }
    setNewTag(tag);
  };

  const addNewTagHandler = () => {
    addNewTag(newTag);
  };

  return (
    <div className="upload-form">
      <div className="upload-form__row upload-form__file">
        <label className="upload-form__label" htmlFor="upload-btn" tabIndex="0">
          Upload a file:
        </label>
        <input id="upload-btn" onChange={uploadFileHandler} type="file" accept={acceptFileType.images} />
      </div>
      <div className="upload-form__row upload-form__name">
        <label className="upload-form__label" htmlFor="file-name">
          File name:
        </label>
        <input id="file-name" value={fileDescriptor.title} type="text" onChange={fileNameChange} />
      </div>
      <div className="upload-form__row upload-form__collection">
        <label htmlFor="file-collection">Collection:</label>
        <select id="file-collection" value={activeCollection} onChange={changeCollection}>
          {collectionOptions}
        </select>
      </div>
      <div className="upload-form__row upload-form__tags">
        <label htmlFor="file-tags">Tags:</label>
        <div className="upload-form__new-tag">
          <input value={newTag} type="text" onChange={updateTagInput}></input>
          <button onClick={addNewTagHandler}>Add</button>
        </div>
        <select id="file-tags" size={3} onChange={changeTags} multiple>
          {tagOptions}
        </select>
      </div>
      <div className="upload-form__description">
        <label htmlFor="file-description">Description:</label>
        <textarea
          id="file-description"
          rows={2}
          onChange={changeDescription}
          value={fileDescriptor.description}
        ></textarea>
      </div>
      <div className="upload-form__row upload-form__controls">
        <button className="button cancel-btn" onClick={closeHandler} type="button">
          Cancel
        </button>
        <button className="button ok-btn" onClick={onUpload} type="button">
          Upload
        </button>
      </div>
    </div>
  );
};

export default EditForm;
