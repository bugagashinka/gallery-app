import {
  DEFAULT_COLLECTION_NAME1,
  SET_COLLECTION,
  INIT_COLLECTIONS,
  INIT_TAGS,
  INIT_IMAGES_COLLECTION,
  SET_SEARCH_QUERY,
  SET_ERROR,
  UPDATE_STATS,
  SET_ACTIVE_FILE,
  SHOW_MODAL_WINDOW,
} from "constants.js";

const initialState = {
  activeFile: {
    title: "",
    file: null,
    collection: "",
    description: "",
    tags: [],
  },
  showModalType: null,
  currentColl: DEFAULT_COLLECTION_NAME1,
  collections: [],
  images: [],
  tags: [],
  searchQuery: "",
  stats: {
    usage: 0,
    quota: 0,
    filesCount: 0,
  },
  error: "",
};

// Reducers

const activeFile = (state, { type, value }) => {
  switch (type) {
    case SET_ACTIVE_FILE:
      return value;
    default:
      return state;
  }
};

const stats = (state, { type, value }) => {
  switch (type) {
    case UPDATE_STATS:
      return { ...value };
    default:
      return state;
  }
};

const currentColl = (state, action) => {
  switch (action.type) {
    case SET_COLLECTION:
      return action.value;
    default:
      return state;
  }
};

const searchQuery = (state, { type, value }) => {
  switch (type) {
    case SET_SEARCH_QUERY:
      return value;
    default:
      return state;
  }
};

const images = (state, { type, value }) => {
  switch (type) {
    case INIT_IMAGES_COLLECTION:
      return value;
    default:
      return state;
  }
};

const collections = (state, { type, value }) => {
  switch (type) {
    case INIT_COLLECTIONS:
      return value;
    default:
      return state;
  }
};

const tags = (state, { type, value }) => {
  switch (type) {
    case INIT_TAGS:
      return value;
    default:
      return state;
  }
};

const error = (state, action) => {
  switch (action.type) {
    case SET_ERROR:
      return action.value;
    default:
      return state;
  }
};

const showModalType = (state, action) => {
  switch (action.type) {
    case SHOW_MODAL_WINDOW:
      return action.value;
    default:
      return state;
  }
};

const logicState = (state = initialState, action) => {
  return {
    activeFile: activeFile(state.activeFile, action),
    showModalType: showModalType(state.showModalType, action),
    currentColl: currentColl(state.currentColl, action),
    collections: collections(state.collections, action),
    tags: tags(state.tags, action),
    images: images(state.images, action),
    searchQuery: searchQuery(state.searchQuery, action),
    stats: stats(state.stats, action),
    error: error(state.error, action),
  };
};

export default logicState;
