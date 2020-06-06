import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { DialogProps } from '@material-ui/core/Dialog';
import { withTheme } from '@material-ui/core/styles';

import { closeDialog, dialogProps, internalProps, isDialogOpened } from '#/@store/dialog';

import { DialogTsx } from './DialogTsx';

import { withResize } from '@hooks/withResize';

interface IMappedState {
  component: any;
  dialogProps: Partial<DialogProps>;
  open: boolean;
  internalProps?: any;
}

const mapStateToProps = createStructuredSelector<any, any>({
  dialogProps,
  internalProps,
  open: isDialogOpened,
});

interface IMappedDispatch {
  closeDialog: any;
}

const mapDispatchToProps = {
  closeDialog,
};

const mergeProps = (
  { component, dialogProps, open, internalProps }: IMappedState,
  { closeDialog }: IMappedDispatch
) => ({
  internalProps,
  onClose: closeDialog,
  open,
  scroll: 'paper',
  transitionDuration: 400,
  ...dialogProps,
});

export default connect<IMappedState, IMappedDispatch, any>(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(withTheme(withResize(DialogTsx)));
