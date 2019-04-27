import { DialogProps } from '@material-ui/core/Dialog';
import { withTheme } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { withResize } from 'hocs/withResize';
import { closeDialog, dialogProps, isDialogOpened, restProps } from 'store/dialog';
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
}

const mapDispatchToProps = {
  closeDialog,
};

const mergeProps = ({ component, dialogProps, open, restProps }: IMappedState, { closeDialog }: IMappedDispatch) => ({
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
)(withTheme()(withResize(DialogTsx)));
