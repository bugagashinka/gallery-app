import { collectionDescriptorsToZip } from "utils/convertors";
import {
  initCollections,
  initTags,
  initImagesCollection,
  selectCollection,
  setError,
  setSearchQuery,
  showModalWindow,
  hideModalWindow,
  selectFile,
} from "actions";
import db from "db";

import { DEFAULT_COLLECTION_NAME1, UPDATE_STATS, modalWindowTypes } from "constants.js";

// Thunks

const uploadFile = (fileDescriptor) => async (dispatch) => {
  await db.uploadImage({ ...fileDescriptor, fileURL: URL.createObjectURL(fileDescriptor.file) });
  dispatch(switchCollection(fileDescriptor.collection));
  dispatch(hideModalWindow());
};

const clearStorage = () => async (dispatch) => db.clearStorage().then(() => dispatch(switchCollection()));

const getStorageStats = () => async (dispatch) =>
  db.getStats().then((stats) => dispatch({ type: UPDATE_STATS, value: stats }));

const switchCollection = (collectionName = DEFAULT_COLLECTION_NAME1) => async (dispatch) => {
  const blobImages = await db.getImagesCollection(collectionName);
  const urlImages = blobImages.map((img) => ({ ...img, file: URL.createObjectURL(img.file) }));
  dispatch(initImagesCollection(urlImages));
  dispatch(selectCollection(collectionName));
  dispatch(setSearchQuery(""));
  dispatch(getStorageStats());
};

const search = (query) => async (dispatch) => {
  if (!query) return;
  const keyWords = query.split(" ");
  const titles = keyWords.filter((key) => !key.startsWith("#"));
  const tags = keyWords.filter((key) => key.startsWith("#"));

  const blobImages = await db.search(titles, tags);
  const urlImages = blobImages.map((img) => ({ ...img, file: URL.createObjectURL(img.file) }));
  const searchQuery = (tags.length ? `tags - [${tags}] ` : "") + (titles.length ? `titles - [${titles}]` : "");
  dispatch(setSearchQuery(searchQuery));
  dispatch(initImagesCollection(urlImages));
};

const removeCollection = (title, withContent = false) => async (dispatch) => {
  await db.removeCollection(title, withContent);
  dispatch(getCollections());
};

const removeActiveFile = () => async (dispatch, getState) => db.removeFile(getState().activeFile.id);

const getCollections = (activeCollection) => async (dispatch) => {
  const collections = await db.getCollections();
  dispatch(initCollections(collections));
  dispatch(switchCollection(activeCollection));
};

const getTags = () => async (dispatch) => {
  const tags = await db.getTags();
  dispatch(initTags(tags.map((tag) => tag.name)));
};

const editCollectionName = (currName, newName) => (dispatch) =>
  db.renameCollection(newName, currName).then(() => dispatch(getCollections(newName)));

const addNewCollection = (collectionName) => async (dispatch) => {
  try {
    await db.addCollection(collectionName);
    dispatch(getCollections(collectionName));
  } catch (e) {
    console.error(e);
    dispatch(setError("Collection with this name already exist"));
    dispatch(dispatch(showModalWindow(modalWindowTypes.INFO_DIALOG)));
  }
};

const addNewTag = (tagName) => async (dispatch) => {
  try {
    await db.addTag(tagName);
    dispatch(getTags());
  } catch (e) {
    console.error(e);
  }
};

const updateFileData = (fileDescriptor) => (dispatch) => {
  dispatch(showModalWindow(modalWindowTypes.EDIT_FORM_DIALOG));
  dispatch(selectFile({ ...fileDescriptor, file: null }));
};

const downloadCollectionArchive = () => async (dispatch, getState) => {
  const descriptorList = await db.downloadImagesCollection();
  collectionDescriptorsToZip(getState().currentColl, descriptorList);
};

export {
  getCollections,
  getTags,
  editCollectionName,
  addNewCollection,
  addNewTag,
  uploadFile,
  switchCollection,
  clearStorage,
  removeCollection,
  search,
  updateFileData,
  removeActiveFile,
  downloadCollectionArchive,
};
