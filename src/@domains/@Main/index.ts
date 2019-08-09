import { goBack, push } from 'connected-react-router';
import { connect } from 'react-redux';

import { closeDialog, openDialog } from '@store/dialog';
import { MainJsx } from './Main';

const mapDispatchToProps = {
  closeDialog,
  goBack,
  openDialog,
  push,
};

export default connect(
  null,
  mapDispatchToProps
)(MainJsx);
