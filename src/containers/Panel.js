import { connect } from "react-redux";
import Panel from "ui/Panel";
import { uploadFile } from "thunk";
import { showCreateFormDialog } from "actions";

export default connect(null, { uploadFile, showCreateFormDialog })(Panel);
