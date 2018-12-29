import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import { cloneElement, createElement, isValidElement } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { closeDialog, dialogContent, dialogProps, isDialogOpened } from 'src/store/dialog';

interface IMappedState {
  component: any;
  dialogProps: Partial<DialogProps>;
  open: boolean;
}

const mapStateToProps = createStructuredSelector<any, any>({
  component: dialogContent,
  dialogProps,
  open: isDialogOpened,
});

interface IMappedDispatch {
  onClose: () => void;
}

const mapDispatchToProps = {
  onClose: closeDialog,
};

const mergeProps = ({ component, dialogProps, open }: IMappedState, { onClose }: IMappedDispatch) => ({
  children: component
    ? isValidElement(component)
      ? cloneElement<any>(component, { onClose })
      : createElement(component, { onClose })
    : '',
  onClose,
  open,
  scroll: 'body',
  ...dialogProps,
});

export default connect<IMappedState, IMappedDispatch, any>(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Dialog);
