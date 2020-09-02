import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { closeDialog, dialogsData, IDialog, lastProps } from '#/@store/dialog';

import { DialogTsx } from './dialog';

import { withResize } from '@hooks/with-resize';
import { IState } from '@types';

interface IMappedState {
  dialogsData: IDialog[];
  lastProps: any;
}

const mapStateToProps = createStructuredSelector<IState, IMappedState>({
  dialogsData,
  lastProps,
});

const mapDispatchToProps = {
  closeDialog,
};

export default connect(mapStateToProps, mapDispatchToProps)(withResize(DialogTsx) as any);
