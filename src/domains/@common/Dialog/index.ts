import { DialogProps } from '@material-ui/core/Dialog';
// import { cloneElement, createElement, isValidElement } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { closeDialog, dialogProps, isDialogOpened } from 'src/store/dialog';
import { DialogTsx } from './DialogTsx';

interface IMappedState {
  component: any;
  dialogProps: Partial<DialogProps>;
  open: boolean;
}

const mapStateToProps = createStructuredSelector<any, any>({
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
  onClose,
  open,
  scroll: 'paper',
  transitionDuration: 400,
  ...dialogProps,
});

export default connect<IMappedState, IMappedDispatch, any>(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(DialogTsx);
