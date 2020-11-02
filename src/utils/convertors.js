import JsZip from "jszip";
import FileSaver from "file-saver";

export const getBlobFromURL = async (objectURL) => {
  return await fetch(objectURL).then((res) => res.blob());
};

export const collectionDescriptorsToZip = async (collectionName, descriptorList) => {
  const zip = JsZip();

  descriptorList.forEach((descriptor) => zip.file(descriptor.title, descriptor.file));

  const zipFile = await zip.generateAsync({ type: "blob" });
  const fileName = `${collectionName}.zip`;
  return FileSaver.saveAs(zipFile, fileName);
};

export const bytesToMB = (value) => value / (1024 * 1024);
