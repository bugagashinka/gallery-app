import { connect } from "react-redux";
import Main from "ui/Main";
import { updateFileData, downloadCollectionArchive } from "thunk";
import { showFileConfirmDialog, selectFile } from "actions";

const mapStateToProps = ({ currentColl, images, searchQuery }) => ({ currentColl, images, query: searchQuery });

export default connect(mapStateToProps, {
  updateFileData,
  showFileConfirmDialog,
  selectFile,
  downloadCollectionArchive,
})(Main);
