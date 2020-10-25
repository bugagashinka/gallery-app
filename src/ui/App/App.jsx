import React, { useState, useEffect } from "react";
import Main from "containers/Main";
import Panel from "containers/Panel";
import MenuButton from "ui/MenuButton";
import ModalWindow from "ui/ModalWindow";
import EditForm from "containers/EditForm";
import ErrorDialog from "containers/ErrorDialog";
import ConfirmDialog from "ui/ModalWindow/ConfirmDialog";
import { modalWindowTypes, inputModeEnum } from "constants.js";

function App({ showModalType, hideModalWindow, removeCollection, currentColl, clearStorage }) {
  const [showModal, toggleModal] = useState(false);

  const closeModalWindow = () => {
    toggleModal(!showModal);
    hideModalWindow();
  };

  useEffect(() => {
    if (showModalType) {
      toggleModal(true);
    }
  }, [showModalType]);

  const deleteCollectionHandler = () => {
    removeCollection(currentColl);
    closeModalWindow();
  };
  const fullCollectionDeleteHandler = () => {
    removeCollection(currentColl, true);
    closeModalWindow();
  };

  const clearStorageHandler = () => {
    clearStorage();
    closeModalWindow();
  };

  const editFormDialog = (() => {
    if (showModalType === modalWindowTypes.EDIT_FORM_DIALOG) {
      return <EditForm mode={inputModeEnum.EDIT_MODE} closeHandler={closeModalWindow} />;
    } else if (showModalType == modalWindowTypes.CREATE_FORM_DIALOG) {
      return <EditForm mode={inputModeEnum.CREATE_MODE} closeHandler={closeModalWindow} />;
    }
  })();

  const errorDialog = showModalType === modalWindowTypes.INFO_DIALOG && <ErrorDialog onClose={closeModalWindow} />;
  const deleteFileDialog = showModalType === modalWindowTypes.DELETE_FILE_DIALOG && null;
  const clearStorageDialog = showModalType === modalWindowTypes.CLEAR_STORAGE_DIALOG && (
    <ConfirmDialog cancelHandler={closeModalWindow} onDelete={clearStorageHandler}>
      <p>
        Do you really want to delete <strong>all files</strong>?
      </p>
    </ConfirmDialog>
  );
  const deleteCollectionDialog = showModalType === modalWindowTypes.DELETE_COLLECTION_DIALOG && (
    <ConfirmDialog
      cancelHandler={closeModalWindow}
      onDelete={deleteCollectionHandler}
      onFullDelete={fullCollectionDeleteHandler}
    >
      <p>Do you really want to delete collection?</p>
    </ConfirmDialog>
  );

  return (
    <main className="app">
      <div className="container">
        <div className="app__inner">
          <MenuButton />
          <Panel />
          <Main />
          <ModalWindow isVisible={showModal} onClose={closeModalWindow}>
            {editFormDialog}
            {errorDialog}
            {deleteFileDialog}
            {deleteCollectionDialog}
            {clearStorageDialog}
          </ModalWindow>
        </div>
      </div>
    </main>
  );
}

export default App;
