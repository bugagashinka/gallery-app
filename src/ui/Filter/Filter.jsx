import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { inputModeEnum } from "constants.js";

const LIST_ITEM_LIMIT = 18;

const Filter = (props) => {
  const {
    collections = [],
    currentColl,
    getCollections,
    switchCollection,
    editCollectionName,
    addNewCollection,
    removeCollection,
    showCollectionConfirmDialog,
    search,
  } = props;

  useEffect(() => {
    getCollections();
  }, []);

  useEffect(() => {
    setCollectionValue(currentColl);
  }, [currentColl]);

  const [inputModeState, setInputModeState] = useState({
    mode: inputModeEnum.CREATE_MODE,
    initialValue: "",
  });
  const [searchQueryInput, updateSearchQuery] = useState("");
  const [collectionInputValue, setCollectionValue] = useState("");
  const [showCollectionInput, toggleCollectionInput] = useState(false);

  const addHandler = () => {
    setInputModeState((prevState) => ({ ...prevState, mode: inputModeEnum.CREATE_MODE }));
    setCollectionValue("");
    toggleCollectionInput(!showCollectionInput);
  };

  const selectCollectionHandler = (collectionName) => (e) => {
    e.preventDefault();
    switchCollection(collectionName);
  };

  const acceptHandler = () => {
    if (!collectionInputValue) return;

    if (inputModeState.mode === inputModeEnum.EDIT_MODE) {
      editCollectionName(inputModeState.initialValue, collectionInputValue);
    } else {
      addNewCollection(collectionInputValue);
    }
    toggleCollectionInput(!showCollectionInput);
  };

  const cancelHandler = () => {
    toggleCollectionInput(!showCollectionInput);
  };

  const removeHandler = () => {
    toggleCollectionInput(!showCollectionInput);
    showCollectionConfirmDialog();
  };

  const changeHandler = ({ target }) => {
    setCollectionValue(target.value);
  };

  const editHandler = (albumName) => (e) => {
    setInputModeState({ initialValue: albumName, mode: inputModeEnum.EDIT_MODE });
    setCollectionValue(albumName);
    toggleCollectionInput(true);
  };

  const onSearchChange = ({ target }) => updateSearchQuery(target.value);

  const handleSearchRequest = (e) => {
    if (e.key === "Enter") {
      search(searchQueryInput);
    }
  };

  const collectionsItems = collections.map(({ title: collectionName }) => {
    const collectionStyle = classNames("collections-names-link", "filter__list-link", {
      active: currentColl === collectionName,
    });
    const displayedName =
      collectionName.length > LIST_ITEM_LIMIT ? `${collectionName.slice(0, LIST_ITEM_LIMIT)}...` : collectionName;
    return (
      <li className="collections-names__item" key={collectionName} title={collectionName}>
        <a href="#" className={collectionStyle} onClick={selectCollectionHandler(collectionName)}>
          {displayedName}
        </a>
        <button onClick={editHandler(collectionName)} className="button collections__edit-btn" type="button"></button>
      </li>
    );
  });

  return (
    <section className="filter">
      <article className="search">
        <form className="search-form" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            className="input search-form__input"
            value={searchQueryInput}
            placeholder="Search by #tags, 'title'"
            onChange={onSearchChange}
            onKeyDown={handleSearchRequest}
          />
        </form>
      </article>
      <article className="collections filter__item">
        <section className="collections__header">
          <h3 className="title panel-title">Collections</h3>
          <button className="button collections__add-btn" onClick={addHandler}></button>
        </section>
        <ul className="collections-names filter__list">
          <li
            key="collection-create"
            className={classNames("collections-names__create", {
              "collections-names__create_visible": showCollectionInput,
            })}
          >
            <input
              onChange={changeHandler}
              value={collectionInputValue}
              className="collections-input collections-names__input filter__list-link active"
            ></input>
            <div className="collections-names__controls">
              <button className="button collections__accept-btn" onClick={acceptHandler} type="button"></button>
              <button className="button collections__cancel-btn" onClick={cancelHandler} type="button"></button>
              {inputModeState.mode === inputModeEnum.EDIT_MODE && (
                <button className="button collections__remove-btn" onClick={removeHandler} type="button"></button>
              )}
            </div>
          </li>
          {collectionsItems}
        </ul>
      </article>
    </section>
  );
};

export default Filter;
