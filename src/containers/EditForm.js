import { connect } from "react-redux";
import EditForm from "ui/ModalWindow/EditForm";
import { uploadFile, addNewTag, getTags } from "thunk";

const mapStateToProps = ({ activeFile, currentColl, collections, tags }) => ({
  activeFile,
  activeCollection: currentColl,
  collections,
  tags,
});

export default connect(mapStateToProps, { uploadFile, addNewTag, getTags })(EditForm);
