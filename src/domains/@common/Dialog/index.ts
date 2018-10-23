import Dialog from '@material-ui/core/Dialog';
import { cloneElement, createElement, isValidElement } from 'react';
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
    children: component
      ? isValidElement(component)
        ? cloneElement<any>(component, { onClose })
        : createElement(component, { onClose })
      : '',
    onClose,
    open,
    ...ownProps,
  })
)(Dialog as any) as any;
