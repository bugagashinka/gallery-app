import { connect } from "react-redux";
import Filter from "ui/Filter";
import { showCollectionConfirmDialog } from "actions";
import {
  getCollections,
  editCollectionName,
  addNewCollection,
  switchCollection,
  removeCollection,
  search,
} from "thunk";

const mapStateToProps = ({ collections, currentColl }) => ({
  collections,
  currentColl,
});

export default connect(mapStateToProps, {
  removeCollection,
  getCollections,
  switchCollection,
  editCollectionName,
  addNewCollection,
  showCollectionConfirmDialog,
  search,
})(Filter);
