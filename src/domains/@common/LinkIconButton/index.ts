import IconButton, { IconButtonProps } from '@material-ui/core/IconButton';
import { push } from 'connected-react-router';
import * as React from 'react';
import { connect } from 'react-redux';

const mapDispatchToProps = {
  push,
};

const mergeProps = (state: any, { push, ...restDispatch }: any, { to, ...restOwn }: any) => ({
  ...restDispatch,
  ...restOwn,
  onClick: () => push(to),
});

export const LinkIconButton: React.ComponentType<IconButtonProps & { to: string }> = connect(
  undefined,
  mapDispatchToProps,
  mergeProps
)(IconButton);
