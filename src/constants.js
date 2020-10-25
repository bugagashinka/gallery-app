// GalleryDB default predefined collections
export const DEFAULT_COLLECTION_NAME1 = "Uncollected";
export const DEFAULT_COLLECTION_NAME2 = "All";

// Logic state actions constants
export const SET_COLLECTION = "reducers/logicState/SET_COLLECTION";
export const INIT_COLLECTIONS = "reducers/logicState/INIT_COLLECTIONS";
export const INIT_TAGS = "reducers/logicState/INIT_TAGS";
export const SET_ERROR = "reducers/logicState/SET_ERROR";
export const INIT_IMAGES_COLLECTION = "reducers/logicState/INIT_IMAGES_COLLECTION";
export const UPDATE_STATS = "reducers/logicState/UPDATE_STATS";
export const SET_SEARCH_QUERY = "reducers/logicState/SET_SEARCH_QUERY";
export const SET_ACTIVE_FILE = "reducers/logicState/SET_ACTIVE_FILE";
export const SHOW_MODAL_WINDOW = "reducers/logicState/SHOW_MODAL_WINDOW";

export const inputModeEnum = {
  CREATE_MODE: "create",
  EDIT_MODE: "edit",
};

export const modalWindowTypes = {
  EDIT_FORM_DIALOG: "EDIT_FORM_DIALOG",
  CREATE_FORM_DIALOG: "CREATE_FORM_DIALOG",
  INFO_DIALOG: "INFO_DIALOG",
  DELETE_FILE_DIALOG: "DELETE_FILE_DIALOG",
  DELETE_COLLECTION_DIALOG: "DELETE_COLLECTION_DIALOG",
  CLEAR_STORAGE_DIALOG: "CLEAR_STORAGE_DIALOG",
};
