import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { DialogProps } from '@material-ui/core/Dialog';

import { closeDialog, dialogProps, internalProps, isDialogOpened } from '#/@store/dialog';

import { DialogTsx } from './dialog';

import { withResize } from '@hooks/withResize';
import { IState } from '@types';

interface IMappedState {
  dialogProps: Partial<DialogProps>;
  open: boolean;
  internalProps: any;
}

const mapStateToProps = createStructuredSelector<IState, IMappedState>({
  dialogProps,
  internalProps,
  open: isDialogOpened,
});

const mapDispatchToProps = {
  closeDialog,
};

export default connect(mapStateToProps, mapDispatchToProps)(withResize(DialogTsx));
