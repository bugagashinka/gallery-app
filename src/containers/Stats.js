import { connect } from "react-redux";
import Stats from "ui/Stats";
import { showStorageConfirmDialog } from "actions";

const mapStateToProps = ({ stats }) => ({ stats });

export default connect(mapStateToProps, { showStorageConfirmDialog })(Stats);
