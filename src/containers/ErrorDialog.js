import { connect } from "react-redux";
import ErrorDialog from "ui/ModalWindow/ErrorDialog";
import { setError } from "actions";

const mapStateToProps = ({ error }) => ({ message: error });

export default connect(mapStateToProps, { setError })(ErrorDialog);
