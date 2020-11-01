import { connect } from "react-redux";
import App from "ui/App";
import { hideModalWindow } from "actions";
import { removeCollection, switchCollection, clearStorage, removeActiveFile } from "thunk";

const mapStateToProps = ({ currentColl, showModalType }) => ({
  currentColl,
  showModalType,
});

export default connect(mapStateToProps, {
  hideModalWindow,
  removeCollection,
  switchCollection,
  removeActiveFile,
  clearStorage,
})(App);
