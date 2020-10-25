import Dexie from "dexie";
import { DEFAULT_COLLECTION_NAME1, DEFAULT_COLLECTION_NAME2 } from "constants.js";
import { getBlobFromURL, bytesToMB } from "utils/convertors";

const db = new Dexie("GalleryDB");

const IMAGES_STORAGE = "images";
const COLLECTIONS_STORAGE = "collections";
const TAGS_STORAGE = "tags";

db.version(1).stores({
  [IMAGES_STORAGE]: "++id, title, collection, *tags",
  [COLLECTIONS_STORAGE]: "++id, &title",
  [TAGS_STORAGE]: "++id, &name",
});

db.on("populate", () => {
  db[COLLECTIONS_STORAGE].bulkAdd([
    {
      title: DEFAULT_COLLECTION_NAME1,
    },
    { title: DEFAULT_COLLECTION_NAME2 },
  ]);
});

/** Full 'images' objectStore schema: 
 { title, 
   format (portrait, square, landscape), 
   size, 
   fileSize, 
   mimetype, 
   date, 
   description,
*/

const getCollections = async () => db.table(COLLECTIONS_STORAGE).orderBy(":id").toArray();

const getTags = async () => db.table(TAGS_STORAGE).orderBy(":id").toArray();

const addCollection = async (title) => db.table(COLLECTIONS_STORAGE).add({ title });

const addTag = async (name) => db.table(TAGS_STORAGE).add({ name });

const removeCollection = async (title, withContent = false) => {
  return db.transaction("rw", db[COLLECTIONS_STORAGE], db[IMAGES_STORAGE], async () => {
    const images = await db.table(IMAGES_STORAGE).where({ collection: title });
    if (withContent) {
      await images.delete();
    } else {
      await images.modify((img) => (img.collection = DEFAULT_COLLECTION_NAME1));
    }
    await db.table(COLLECTIONS_STORAGE).where({ title }).delete();
  });
};

const removeFile = async (id) => db.table(IMAGES_STORAGE).delete(id);

const renameCollection = async (newTitle, currentTitle) => {
  return db.transaction("rw", db[COLLECTIONS_STORAGE], db[IMAGES_STORAGE], async () => {
    await db.table(COLLECTIONS_STORAGE).where({ title: currentTitle }).modify({ title: newTitle });
    await db
      .table(IMAGES_STORAGE)
      .where({ collection: currentTitle })
      .modify((img) => (img.collection = newTitle));
  });
};

const downloadImageCollection = async (collectionTitle) => {
  const blobFiles = await getImagesCollection(collectionTitle);
};

const getImagesCollection = (collectionTitle = DEFAULT_COLLECTION_NAME1) => {
  if (collectionTitle === DEFAULT_COLLECTION_NAME2) {
    return db.table(IMAGES_STORAGE).toArray();
  }
  return db.table(IMAGES_STORAGE).where({ collection: collectionTitle }).toArray();
};

const format = {
  LANDSCAPE_FORMAT: "Landscape",
  PORTRAIT_FORMAT: "Portrait",
  SQUARE_FORMAT: "Square",
};
const detectFormat = ([width, height]) => {
  if (width > height) {
    return format.LANDSCAPE_FORMAT;
  } else if (width < height) {
    return format.PORTRAIT_FORMAT;
  } else if (width === height) {
    return format.SQUARE_FORMAT;
  }
};

const getImageDimensions = (objectUrl) => {
  return new Promise((resolve) => {
    const img = new Image(objectUrl);
    img.src = objectUrl;
    img.addEventListener("load", function () {
      resolve([this.naturalWidth || this.width, this.naturalHeight || this.height]);
    });
  });
};

const uploadImage = async (fileDescriptor = {}) => {
  const {
    title = "",
    fileURL = null,
    collection = DEFAULT_COLLECTION_NAME1,
    type = "",
    size = 0,
    tags = [],
    description = "",
  } = fileDescriptor;

  const dimensions = await getImageDimensions(fileURL);
  const fileBlob = await getBlobFromURL(fileURL);
  URL.revokeObjectURL(fileURL);

  return db.transaction("rw", db[IMAGES_STORAGE], async () => {
    const metaData = {
      title,
      file: fileBlob,
      format: detectFormat(dimensions),
      dimensions,
      type,
      size: bytesToMB(size),
      collection,
      tags,
      description,
    };
    if (fileDescriptor.id) {
      metaData.id = fileDescriptor.id;
    }
    db.table(IMAGES_STORAGE).put(metaData);
  });
};

const getStats = async () => {
  const filesCount = await db.table(IMAGES_STORAGE).count();
  let quota = "U/A";
  let usage = "U/A";

  if (navigator.storage && navigator.storage.estimate) {
    ({ quota, usage } = await navigator.storage.estimate());
  } else {
    console.error("StorageManager not found");
  }

  return {
    filesCount,
    quota,
    usage,
  };
};

const clearStorage = async () => db.table(IMAGES_STORAGE).clear();

const search = async (titles, tags) => {
  const searchResultByTags = await db.table(IMAGES_STORAGE).where("tags").anyOf(tags).toArray();
  const searchResultByTitle = await db.table(IMAGES_STORAGE).where("title").startsWithAnyOfIgnoreCase(titles).toArray();
  return [...searchResultByTags, ...searchResultByTitle];
};

export default {
  getImagesCollection,
  getCollections,
  getTags,
  addCollection,
  addTag,
  removeCollection,
  uploadImage,
  clearStorage,
  renameCollection,
  getStats,
  downloadImageCollection,
  search,
  removeFile,
};
