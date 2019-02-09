import { DialogProps } from '@material-ui/core/Dialog';
import { withTheme } from '@material-ui/core/styles';
import { push } from 'connected-react-router';
// import { cloneElement, createElement, isValidElement } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { withResize } from 'src/hocs/withResize';
import { closeDialog, dialogProps, isDialogOpened, restProps } from 'src/store/dialog';
import { DialogTsx } from './DialogTsx';

interface IMappedState {
  component: any;
  dialogProps: Partial<DialogProps>;
  open: boolean;
  restProps?: any;
}

const mapStateToProps = createStructuredSelector<any, any>({
  dialogProps,
  open: isDialogOpened,
  restProps,
});

interface IMappedDispatch {
  closeDialog: any;
  push: any;
}

const mapDispatchToProps = {
  closeDialog,
  push,
};

const mergeProps = (
  { component, dialogProps, open, restProps }: IMappedState,
  { closeDialog, push }: IMappedDispatch
) => ({
  onClose: restProps ? () => push({ ...restProps }) : closeDialog,
  open,
  scroll: 'paper',
  transitionDuration: 400,
  ...dialogProps,
});

export default connect<IMappedState, IMappedDispatch, any>(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(withTheme()(withResize(DialogTsx)));
