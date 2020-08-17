import { connect } from 'react-redux';

import { openDialog } from '#/@store/dialog';
import { goToProjectWithAsk } from '#/@store/user-works';

import { HeaderTsx } from './header';

import { withResize } from '@hooks/with-resize';

const mapDispatchToProps = {
  goToProjectWithAsk,
  openDialog,
};

export default connect(undefined, mapDispatchToProps)(withResize(HeaderTsx));
