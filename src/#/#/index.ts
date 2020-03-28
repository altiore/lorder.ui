import { connect } from 'react-redux';

import { goBack, push } from 'connected-react-router';
import { createStructuredSelector } from 'reselect';

import { closeDialog, openDialog } from '#/@store/dialog';
import { userRole } from '#/@store/identity';
import { prevLocation } from '#/@store/router';

import { MainJsx } from './Main';

import { IState } from '@types';

const mapState = createStructuredSelector<IState, any>({
  prevLocation,
  userRole,
});

const mapDispatchToProps = {
  closeDialog,
  goBack,
  openDialog,
  push,
};

export default connect(
  mapState,
  mapDispatchToProps
)(MainJsx);
