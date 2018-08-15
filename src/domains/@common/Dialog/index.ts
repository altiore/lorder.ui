import Dialog from '@material-ui/core/Dialog';
import { createElement } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { closeDialog, dialogContent, isDialogOpened } from 'src/store/dialog';

export default connect(
  createStructuredSelector({
    component: dialogContent,
    open: isDialogOpened,
  }) as any,
  {
    onClose: closeDialog,
  },
  ({ component, open }: any, { onClose }, ownProps) => ({
    children: component ? createElement(component, { onClose }) : '',
    onClose,
    open,
    ...ownProps,
  })
)(Dialog as any) as any;