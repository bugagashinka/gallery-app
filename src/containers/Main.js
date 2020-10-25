import { connect } from "react-redux";
import Main from "ui/Main";
import { updateFileData, removeFile, switchCollection } from "thunk";

const mapStateToProps = ({ currentColl, images, searchQuery }) => ({ currentColl, images, query: searchQuery });

export default connect(mapStateToProps, { updateFileData, removeFile, switchCollection })(Main);
