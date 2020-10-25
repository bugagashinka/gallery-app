export const getBlobFromURL = async (objectURL) => {
  return await fetch(objectURL).then((res) => res.blob());
};

export const bytesToMB = (value) => value / (1024 * 1024);
