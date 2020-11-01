import {
  SET_COLLECTION,
  INIT_COLLECTIONS,
  INIT_TAGS,
  INIT_IMAGES_COLLECTION,
  SET_SEARCH_QUERY,
  SET_ERROR,
  SET_ACTIVE_FILE,
  SHOW_MODAL_WINDOW,
  modalWindowTypes,
} from "constants.js";

// Action creators
const initCollections = (collections) => ({
  type: INIT_COLLECTIONS,
  value: collections,
});

const initTags = (tags) => ({
  type: INIT_TAGS,
  value: tags,
});

const initImagesCollection = (images) => ({ type: INIT_IMAGES_COLLECTION, value: images });

const selectCollection = (collectionName) => ({
  type: SET_COLLECTION,
  value: collectionName,
});

const selectFile = (descriptor) => ({ type: SET_ACTIVE_FILE, value: descriptor });

const setError = (message) => ({ type: SET_ERROR, value: message });

const setSearchQuery = (query) => ({ type: SET_SEARCH_QUERY, value: query });

const showModalWindow = (dialogType) => ({ type: SHOW_MODAL_WINDOW, value: dialogType });

const hideModalWindow = () => ({ type: SHOW_MODAL_WINDOW, value: null });

const showCreateFormDialog = () => ({ type: SHOW_MODAL_WINDOW, value: modalWindowTypes.CREATE_FORM_DIALOG });

const showFileConfirmDialog = () => ({
  type: SHOW_MODAL_WINDOW,
  value: modalWindowTypes.DELETE_FILE_DIALOG,
});

const showCollectionConfirmDialog = () => ({
  type: SHOW_MODAL_WINDOW,
  value: modalWindowTypes.DELETE_COLLECTION_DIALOG,
});

const showStorageConfirmDialog = () => ({
  type: SHOW_MODAL_WINDOW,
  value: modalWindowTypes.CLEAR_STORAGE_DIALOG,
});

export {
  initCollections,
  initTags,
  initImagesCollection,
  selectCollection,
  setError,
  setSearchQuery,
  selectFile,
  showModalWindow,
  showCreateFormDialog,
  showCollectionConfirmDialog,
  showStorageConfirmDialog,
  showFileConfirmDialog,
  hideModalWindow,
};
