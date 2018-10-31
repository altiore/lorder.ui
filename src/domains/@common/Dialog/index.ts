import Dialog from '@material-ui/core/Dialog';
import { cloneElement, createElement, isValidElement } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { closeDialog, dialogContent, isDialogOpened } from 'src/store/dialog';

interface IMappedState {
  component: any;
  open: boolean;
}

const mapStateToProps = createStructuredSelector<any, any>({
  component: dialogContent,
  open: isDialogOpened,
});

interface IMappedDispatch {
  onClose: () => void;
}

const mapDispatchToProps = {
  onClose: closeDialog,
};

const mergeProps = ({ component, open }: IMappedState, { onClose }: IMappedDispatch, ownProps: any) => ({
  children: component
    ? isValidElement(component)
      ? cloneElement<any>(component, { onClose })
      : createElement(component, { onClose })
    : '',
  onClose,
  open,
  scroll: 'body',
  ...ownProps,
});

export default connect<IMappedState, IMappedDispatch, any>(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Dialog);
